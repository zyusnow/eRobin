from turtle import title
from flask import Blueprint, jsonify
import requests
import os

SECRET_KEY = os.environ.get('SECRET_KEY')

# collect the basic info of a given stock
def fetch_news_info():
    new_info_list = []

    request_url = "https://ms-finance.p.rapidapi.com/news/list"
    request_string = {"performanceId": "0P0000OQN8"}
    request_headers = {
        'x-rapidapi-host': "ms-finance.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
    }

    r = requests.request("GET", request_url, headers=request_headers, params=request_string)
    if r.status_code == requests.codes.ok:
        raw_news_json = r.json()
        for info in raw_news_json:
            new_info_list.append({'source': info['sourceName'],
                                  'title': info['title'],
                                  'date': info['publishedDate']})

        print(new_info_list, "**************************")
    return new_info_list


stock_news_routes = Blueprint("news", __name__)
@stock_news_routes.route("/")
def get_news_info():
    new_info_list = fetch_news_info()
    return jsonify(new_info_list)

holding_routes = Blueprint("holding",__name__)
