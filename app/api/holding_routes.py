from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Holding, Transaction, User, db

holding_routes = Blueprint("holding",__name__)


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
