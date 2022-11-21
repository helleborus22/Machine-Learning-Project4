from flask import Flask, request, render_template, jsonify
import yfinance as yf
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps

# instantiate the Flask app.
app = Flask(__name__)

# API Route for pulling the stock quote
@app.route("/quote")
def display_quote():
	# get a stock ticker symbol from the query string
	# default to AAPL
	symbol = request.args.get('symbol', default="AAPL")

	# pull the stock quote
	quote = yf.Ticker(symbol)

	#return the object via the HTTP Response
	return jsonify(quote.info)

# API route for pulling the stock history
@app.route("/history")
def display_history():
	#get the query string parameters
	symbol = request.args.get('symbol', default="AAPL")
	period = request.args.get('period', default="1y")
	interval = request.args.get('interval', default="1mo")

	#pull the quote
	quote = yf.Ticker(symbol)	
	#use the quote to pull the historical data from Yahoo finance
	hist = quote.history(period=period, interval=interval)
	#convert the historical data to JSON
	data = hist.to_json()
	#return the JSON in the HTTP response
	return data


MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'stockDB'

COLLECTION = 'stocks_aapl_amzn'
FIELDS1 = {'Ticker': True,'Date': True, 'Close': True, '_id': False}

@app.route("/stockDB/stocks_aapl_amzn")
def stocks():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION]
    stocks = collection.find(projection=FIELDS1)
    json_stocks = []
    for stock in stocks:
        json_stocks.append(stock)
    json_stocks = json.dumps(json_stocks, default=json_util.default)
    connection.close()
    return json_stocks


# This is the / route, or the main landing page route.
@app.route("/")
def home():
	# we will use Flask's render_template method to render a website template.
    return render_template("index.html")




# run the flask app.
if __name__ == "__main__":
	app.run(debug=True)
