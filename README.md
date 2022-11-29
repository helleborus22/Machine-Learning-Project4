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

-Nasdaq

# Tasks
- Data pull:
Web scraping model allowed us to find historical stock price openings and closings and earnings data.
- ETL: 
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

![img1](/stock-prediction/images/META%20Linear%20Regression%20Prediction.jpg)

![img2](/stock-prediction/images/META%20Linear%20Regression%20Forecast.jpg)



![img4](/stock-prediction/images/LSTM%20Model%201.jpg)



![img7](/stock-prediction/images/AAPL%20Prediction%20by%20ARIMA.jpg)

![img8](/stock-prediction/images/AAPL%20Forecast%20by%20ARIMA.jpg)

![img9](/stock-prediction/images/AAPL%20Stock%20Price%20Forecast%20by%20ARIMA.jpg)

![img10](/stock-prediction/images/ARIMA%202023.jpg)

![img11](/stock-prediction/images/ARIMA%20Prediction%202023.jpg)

![img12](/stock-prediction/images/ARIMA%20Forecast%202023.jpg)

We built LTSM model 2 with 50 neurons and 4 hidden layers. The training set is 75% of the data. We added the LSTM layer with the following arguments:

✓ 50 units which is the dimensionality of the output space
return_sequences=True which determines whether to return the last output in the output sequence, or the full sequence input_shape as the shape of our training set.

✓ When defining the Dropout layers, we specify 0.2, meaning that 20% of the layers will be dropped.

✓ Thereafter, we add the Dense layer that specifies the output of 1 unit.

✓ After this, we compile our model using the popular adam optimizer and set the loss as the mean_squarred_error.

![img13](/stock-prediction/images/LSTM%20Model%202.jpg)

![img14](/stock-prediction/images/META%20Forecast%20by%20LSTM%202.jpg)

![img15](/stock-prediction/images/META%20Forecast%20by%20LSTM.jpg)


- User Interface:
We used Flask and yfinance API to pull the stock quote. 

![Screen Shot 1](/Flask_Stock_Dashboard/image/Screen%20Shot%202022-11-21%20at%204.01.31%20PM.png)

![Screen Shot 2](/Flask_Stock_Dashboard/image/Screen%20Shot%202022-11-21%20at%204.02.56%20PM.png)

![Screen Shot 3](/Flask_Stock_Dashboard/image/Screen%20Shot%202022-11-21%20at%204.03.21%20PM.png)

# Conclusions
R2 score for Linear Regression: 0.98

R2 score for LSTM Model 2: 0.97

R2 score for ARIMA Model : 0.98


# Limitations: 
ARIMA Model does not allow to save, but it creates a pdf.
ARIMA Model is faster compared to the other models, but all machine learning models take time to run.
During testing, we noticed that at 80/20 split our model produces a higher accuracy score than at 90/10. 






