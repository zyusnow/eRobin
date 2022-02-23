import requests
import os

SECRET_KEY = os.environ.get('SECRET_KEY')
price_cache = {} # use this cache when api limition reaches

# collect the basic info of a given stock
def fetch_stock_info(symbol):
    stock_info = {}

    request_url = "https://yh-finance.p.rapidapi.com/stock/v2/get-profile"
    request_string = {"symbol": symbol.upper(), "region":"US"}
    request_headers = {
        'x-rapidapi-host': "yh-finance.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
    }

    r = requests.request("GET", request_url, headers=request_headers, params=request_string)
    if r.status_code == requests.codes.ok:
        raw_stock_json = r.json()
        stock_info['price'] = raw_stock_json["price"]["regularMarketPrice"]["raw"]
        stock_info['name'] = raw_stock_json["price"]["longName"]
        stock_info['about'] = raw_stock_json["assetProfile"]["longBusinessSummary"]
        stock_info['employees'] =raw_stock_json["assetProfile"]["fullTimeEmployees"]
        stock_info["country"] = raw_stock_json["assetProfile"]["country"]
        stock_info["sector"] = raw_stock_json["assetProfile"]["sector"]
        stock_info["marketcap"] = raw_stock_json["price"]["marketCap"]["fmt"]
        stock_info["peratio"] = raw_stock_json["summaryDetail"]["forwardPE"]["fmt"]

    return stock_info

def fetch_stock_price(symbol):
    request_url = "https://alpha-vantage.p.rapidapi.com/query"
    request_string = {"function":"TIME_SERIES_DAILY", "symbol": symbol.upper(), "outputsize":"compact", "datatype":"json"}
    headers = {
        'x-rapidapi-host': "alpha-vantage.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
    }

    dates = []
    prices = []

    r = requests.request("GET", request_url, headers=headers, params=request_string)
    if r.status_code == requests.codes.ok:
        price_info = r.json()
        price_info = price_info["Time Series (Daily)"]

        for date, info in price_info.items():
            dates.append(date)
            prices.append(info['4. close'])

        dates = dates[::-1]
        prices = prices[::-1]

        # update cache
        price_cache[symbol] = [dates, prices]
    else:
        if symbol not in price_cache:
            price_cache[symbol] = [[], []]
        else:
            dates, prices = price_cache[symbol]

    return dates, prices
