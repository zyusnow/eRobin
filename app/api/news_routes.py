from turtle import title
from flask import Blueprint, jsonify
import os
import finnhub
from datetime import datetime


SECRET_KEY = os.environ.get('SECRET_KEY')
FINN_API_KEY = os.environ.get('FINN_API_KEY')

# collect the basic info of a given stock
def fetch_news_info():
    new_info_list = []

    finnhub_client = finnhub.Client(api_key=FINN_API_KEY)

    # this api returns max 100 records, here to trunk it to 10
    news_info = finnhub_client.general_news('general', min_id=0)[:10]

    for info in news_info:
        new_info_list.append({'source': info['source'],
                              'title': info['headline'],
                              'image': info['image'],
                              'url': info['url'],
                              'summary':info['summary'],
                              'date': datetime.fromtimestamp(info['datetime']).strftime('%Y-%m-%d')})
    # print(f"# of news is {len(new_info_list)} ***********")
    # print(new_info_list, "**************************")
    return new_info_list


stock_news_routes = Blueprint("news", __name__)
@stock_news_routes.route("")
def get_news_info():
    new_info_list = fetch_news_info()
    return jsonify(new_info_list)

holding_routes = Blueprint("holding",__name__)
