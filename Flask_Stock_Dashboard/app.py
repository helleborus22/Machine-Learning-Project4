from flask import Flask, request, render_template, jsonify
import yfinance as yf
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import pandas as pd

from flask import Response
import io
import random
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure


from statsmodels.tsa.arima.model import ARIMA
import math
from math import sqrt
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

import model
from model import ARIMA_model,get_historical,passfunction

# instantiate the Flask app.
app = Flask(__name__)

# This is the / route, or the main landing page route.
@app.route("/")
def home():
    # we will use Flask's render_template method to render a website template.
    return render_template("index.html")



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


#@app.route("/modeldata")  

#def finalmodel():
    #model
    #ticker =request.args.get('symbol', default="AAPL")
    #df_ticker = get_historical(ticker)
    #df_arima_pred = pd.DataFrame()
    #df_arima_pred = pd.DataFrame()
    #df_arima_pred= ARIMA_model(df_ticker, ticker)
   

@app.route("/test")
def test():
    #model
    ticker=request.args.get('symbol', default="AAPL")
    test= passfunction(ticker)
    test=test.to_json()
    return test

if __name__ == "__main__":
    app.run(debug=True)
