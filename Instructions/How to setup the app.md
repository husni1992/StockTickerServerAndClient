Please follow the instruction below to setup and run the stock ticker application.

1) Download and Install these tools:
------------------------------------
i. MYSQL server (XAMPP is recommended - https://www.apachefriends.org/download.html)
ii. NodeJS ('https://nodejs.org/en/')

2) Create the Database:
-----------------------
i. This is very simple, inside the Instructions folder, locate the stored_procedure.sql file and execute the script with your desired tool. 
ii. The stored procedure will create the needed tables and create an infinite event loop for live updating the prices of stocks in the stock_prices.

3) Install and run StockTicker server:
--------------------------------------
i. Goto stock_ticker_server
ii. Open the command window and type in 'npm install' and hit enter. This will install needed node packages for running the node server.
iii. After completing package install, type in 'gulp serve'. This will run the nodejs server. At first run, the stock table data will be inserted.

4) Install and run StockTicker Client Application:
--------------------------------------------------
i. Goto stock_ticker_client folder.
ii. Open command window and type in 'npm install' and hit enter and wait till it completes. This will install all the needed node packages for the application.
iii. Now you are all setup. Just goto stock_ticker_client folder and run 'gulp start' in command window. And the app will run and open in browser.

Note: gulp task runner will watch for any changes made in the application and render in the browser automatically.

