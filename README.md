# Machine Learning Project 4
# Member Names:

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
We also used ARIMA Model to predict the stock price. We calculated the mean square error, mean absolute error, root mean square error. 
We compiled our model using the popular adam optimizer and set the loss as the mean_squarred_error. 
We visualized the results of our model, which showed trainining, validation and prediction. 
![img1]()

- User Interface:
We used Flask and yfinance API to pull the stock quote. 

![Screen Shot 2022-11-21 at 4.01.31](/Flask_Stock_Dashboard/image/Screen%20Shot%202022-11-21%20at%204.01.31%20PM.png)



# Limitations: 
ARIMA Model does not allow to save, but it creates a pdf.
ARIMA Model is faster compared to the other models, but all machine learning models take time to run. We don't have a confusion matrix because 
During testing, we noticed that at 80/20 split our model produces a higher accuracy score than at 90/10. 






