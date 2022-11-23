# Machine Learning Project 4
# Member Names:

***DRAFT*** Google Doc Link: https://docs.google.com/document/d/1FxyoGI-4Eo2gtWUtdhRD8SwRAJwM8T-6u6hua1RIt0o/edit

Giovanna Lizzio,
I ju Su (Selina Su),
Indra Nandagopal,
Joshua Cressaty,
Kelly Brown,
Michael Ariwodo,
Miranda Hermes,
Mohamed Bilal,
Marjorie Muñoz.

# Project Description

Creating an interactive webpage where an investor may look up a prediction of future closing stock prices based on a ticker symbol. The prediction will be created using deep learning models and LSTM neural networks.

# Datasets to Be Used
-Yahoo Finance

-Kaggle US Stock Market Data 

-Polygon API

-Nasdaq

# Tasks
- Data pull:
Web scraping model allowed us to find historical stock price openings and closings and earnings data.
- ETL
We checked and removed null values
We created a dataframe using only the close stock price column
We converted the dataframe to a numpy array to train the LSTM Model
We normalized the data before model fitting using MinMaxScaler
The training dataset contained the last 180-day closing price values. 
To prevent overfitting we added four hidden layers
- Database Management: 
We used SQL lite to create our database.
- Machine Learning:
We used yfinance to pull data according to the different tickers selected from July 2015 to December 2020.
We plotted the data using matplotlib for stock price history and stock volume history. 
We used LSTM Model for training and testing the data. The average of the stock prices was used to train the data. 
We made predictions based on historical data.
We also used ARIMA Model to predict the stock price.
We compiled our model using the popular adam optimizer and set the loss as the mean_squarred_error. 
We visualized the results of our model, which showed trainining, validation and prediction. 
- User Interface:
We used Flask and yfinance API to pull the stock quote. 

# Limitations: 
ARIMA Model does not allow to save, but it creates a pdf.
ARIMA Model is faster compared to the other models, but all machine learning models take time to run.  






