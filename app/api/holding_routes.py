from types import MethodDescriptorType
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Holding, Transaction, User, db
from .stock_api import fetch_stock_price

holding_routes = Blueprint("holding",__name__)


@holding_routes.route('/all', methods=["POST"])
@login_required
def get_holdings():
    user_id = request.json['userId']
    holdings = Holding.query.filter(Holding.user_id == user_id).all()
    return jsonify([holding.to_dict() for holding in holdings])


@holding_routes.route("/portfolio", methods=["POST"])
# @login_required
def get_portfolio():
    user_id = request.json['userId']

    # first fetch all holding stocks
    holdings = Holding.query.filter(Holding.user_id == user_id).all()
    hist_balance = []
    hist_date = []

    user = User.query.get(user_id)
    current_balance = user.curr_balance

    for holding in holdings:
        ticker = holding.ticker
        share = int(holding.total_shares)

        date, prices = fetch_stock_price(ticker)
        hold_balance= [float(p)*share for p in prices]

        if not hist_balance:
            hist_balance = [current_balance] * len(prices)

        hist_balance = [hold_balance[i] + b for i, b in enumerate(hist_balance)]

        if not hist_date:
            hist_date = date

    portfolio_info = {}
    portfolio_info['date'] = hist_date
    portfolio_info['prices'] = hist_balance

    return jsonify(portfolio_info)


@holding_routes.route('/', methods=["POST"])
@login_required
def get_holding():
    ticker, user_id = request.json['ticker'], request.json['userId']
    holding_info = Holding.query.filter_by(ticker=ticker, user_id=user_id).first()

    # in buy/sell page, show default infor even if user has no holding on one ticker
    default_holding = {
        'id': "",
        'ticker': ticker,
        'total_shares': 0,
        'avg_price': 0,
        'user_id': user_id
    }

    holding_info = holding_info.to_dict() if holding_info else default_holding
    return jsonify(holding_info)


@holding_routes.route('/', methods=["PUT"])
def put_order():
    order = request.json['orderInfo']
    ticker = order['ticker']
    user_id = int(order['userId'])
    share = int(order['share'])
    price = float(order['price'])
    order_type = order['orderType']

    # create transcation record
    new_order = Transaction(ticker=ticker,
                            transaction_shares=share,
                            transaction_price=price,
                            transaction_type=order_type,
                            user_id=user_id)

    db.session.add(new_order)

    # fetch current balance
    user = User.query.get(user_id)
    current_balance = user.to_dict()['curr_balance']
    # current_balance = user.curr_balance, this is also working, two ways.

    # update holding
    holding_record = Holding.query.filter_by(ticker=ticker, user_id=user_id).first()

    hold_share = 0
    avg_price = 0

    if holding_record:
        hold_share = holding_record.total_shares
        avg_price = holding_record.avg_price

    #  update avg price, holding share and current balance
    if order_type == "Buy":
        avg_price = (avg_price * hold_share + price * share) / (hold_share + share)
        hold_share += share
        current_balance -= price * share
    else:
        left_share = (hold_share - share)
        left_share = 1 if left_share == 0 else left_share
        avg_price = (avg_price * hold_share - price * share) / left_share
        hold_share -= share
        current_balance += price * share

    # if alreayd exist a holding reward, then update it
    if holding_record:
        holding_record.total_shares = hold_share
        holding_record.avg_price = avg_price

    # otherwise, add a new one
    else:
        new_holding = Holding(
            ticker = ticker,
            total_shares = hold_share,
            avg_price = price,
            user_id = user_id
        )

        db.session.add(new_holding)

    # at last need to update user balance
    user.curr_balance = current_balance

    db.session.commit()
    return "ok"
