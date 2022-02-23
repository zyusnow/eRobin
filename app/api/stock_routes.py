from flask import Blueprint, jsonify
from .stock_api import fetch_stock_info, fetch_stock_price

stock_routes = Blueprint("stocks", __name__)
@stock_routes.route("/<ticker>")
def get_stock_info(ticker):

    stock_info = fetch_stock_info(ticker)
    dates, prices = fetch_stock_price(ticker)

    stock_info['date'] = dates
    stock_info['prices'] = prices

    return jsonify(stock_info)
