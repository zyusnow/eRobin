from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, WatchlistTicker

watchlist_ticker_routes = Blueprint("watchlist-tickers", __name__)

@watchlist_ticker_routes.route("/<int:watchlist_id>")
@login_required
def get_watchlist_tickers(watchlist_id):
    watchlist_tickers = WatchlistTicker.query.filter(WatchlistTicker.watchlist_id == watchlist_id).all()
    return jsonify([tickers.to_dict() for tickers in watchlist_tickers])


# @watchlist_ticker_routes.route("/add>", methods=['POST'])
# @login_required
# def add_ticker(tickerId):



@watchlist_ticker_routes.route("/delete/<int:tickerId>", methods=['DELETE'])
@login_required
def delete_ticker(tickerId):
    ticker = WatchlistTicker.query.get(tickerId)
    db.session.delete(ticker)
    db.session.commit()
    return "Delete successfully"
