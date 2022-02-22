from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Holding, Transaction, User, db

holding_routes = Blueprint("holding",__name__)


@holding_routes.route('/<int:userId>/all')
@login_required
def get_holdings(userId):
    holdings = Holding.query.filter(Holding.user_id == userId).all()
    return jsonify([holding.to_dict() for holding in holdings])


@holding_routes.route('/', methods=["POST"])
@login_required
def get_holding():
    ticker, user_id = request.json['ticker'], request.json['userId']
    holding_info = Holding.query.filter_by(ticker=ticker, user_id=user_id).first()

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
