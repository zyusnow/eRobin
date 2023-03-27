import requests
import os
import json

SECRET_KEY = os.environ.get('SECRET_KEY')
RAPID_API_KEY = os.environ.get("RAPID_API_KEY")
price_cache = {} # use this cache when api limition reaches
info_cache = {} # use this cache when api limition reaches

# load predefined stock symbol list
with open("./app/api/stocksym.json", "r") as f:
    stock_sym_map = json.load(f)

def to_billion_string(num):
    num = int(num)
    if num >= 10**9:
        return f"{num/10**9:.2f}B"
    else:
        return str(num)

# collect the basic info of a given stock
def fetch_stock_info(symbol):
    stock_info = {}
    stock_symbol = symbol.upper()

    host = "yahoo-finance15.p.rapidapi.com"
    request_url = f"https://{host}/api/yahoo/mo/module/{stock_symbol}"
    request_string = {"symbol": stock_symbol}
    request_headers = {
        'x-rapidapi-host': host,
        'x-rapidapi-key': RAPID_API_KEY
    }

    query_str = {"module":"asset-profile,financial-data,earnings"}

    r = requests.request("GET", request_url, headers=request_headers, params=query_str)
    # url = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={stock_symbol}&apikey={AV_API_KEY}'
    # r = requests.get(url)

    if r.status_code == requests.codes.ok:
        raw_stock_json = r.json()
        #stock_info['price'] = raw_stock_json["price"]["regularMarketPrice"]["raw"]
        stock_info['name'] = stock_sym_map.get(stock_symbol, "not appliable")
        stock_info['about'] = raw_stock_json['assetProfile'].get("longBusinessSummary", "not appliable")
        stock_info['employees'] =raw_stock_json['assetProfile'].get("fullTimeEmployees", "not appliable")
        stock_info["country"] = raw_stock_json['assetProfile'].get("country", "not appliable")
        stock_info["sector"] = raw_stock_json['assetProfile'].get("sector", "not appliable")

        market_cap = raw_stock_json.get('MarketCapitalization', "no appliable")
        stock_info["marketcap"] = to_billion_string(market_cap) if market_cap != "no appliable" else market_cap
        stock_info["peratio"] = raw_stock_json.get('PERatio', "no appliable")
        # update cache
        info_cache[stock_symbol] = stock_info

    elif stock_symbol in info_cache:
        stock_info = info_cache[stock_symbol]

    return stock_info

def fetch_stock_price(symbol):
    # request_url = "https://alpha-vantage.p.rapidapi.com/query"
    # request_string = {"function":"TIME_SERIES_DAILY", "symbol": symbol.upper(), "outputsize":"compact", "datatype":"json"}
    # headers = {
    #     'x-rapidapi-host': "alpha-vantage.p.rapidapi.com",
    #     'x-rapidapi-key': RAPID_API_KEY
    # }

    # r = requests.request("GET", request_url, headers=headers, params=request_string)

    stock_symbol = symbol.upper()

    host = "yahoo-finance15.p.rapidapi.com"
    request_url = f"https://{host}/api/yahoo/hi/history/{stock_symbol}/1d"
    request_headers = {
        'x-rapidapi-host': host,
        'x-rapidapi-key': RAPID_API_KEY
    }

    query_str = {"diffandsplits":"false"}

    r = requests.request("GET", request_url, headers=request_headers, params=query_str)

    dates = []
    prices = []

    print(r.status_code)

    if r.status_code == requests.codes.ok:
        price_info = r.json()
        price_info = price_info["items"]
        price_info = sorted(price_info.items(), key=lambda d:d[0], reverse=True)[:100]

        for _, info in price_info:
            date = info['date']
            dates.append(date)
            price = info['close']
            prices.append(price)

        dates = dates[::-1]
        prices = prices[::-1]

        print(dates)
        # update cache
        price_cache[symbol] = [dates, prices]
    else:
        if symbol not in price_cache:
            price_cache[symbol] = [[], []]
        else:
            dates, prices = price_cache[symbol]

    return dates, prices
