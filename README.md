# Springboard Capstone Project

This project was built in line with the "Advanced Track" (i.e. starting from scratch). The goal is to create a front-end web application that presents data retrieved from Binance API.

## [Step Three] Source the Data

* Use Binance API
    - https://binance-docs.github.io/apidocs/spot/en/#old-trade-lookup
* Use Chart.js
    - https://www.chartjs.org/docs/latest/
* Use plotly.js
    - https://plotly.com/

* Data format 

```json
    [
        {
            "a": 26129,         // Aggregate tradeId
            "p": "0.01633102",  // Price
            "q": "4.70443515",  // Quantity
            "f": 27781,         // First tradeId
            "l": 27781,         // Last tradeId
            "T": 1498793709153, // Timestamp
            "m": true,          // Was the buyer the maker?
            "M": true           // Was the trade the best price match?
        }
    ]

  ```

### Important Data: Price, Quantity, Timestamp (per Crypto Currency)

## [Step Four] Coding User Flows

* Possible User Interactions
    - Click the 'Introduction' Link
    - Click the Button on the 'Introduction' page to load the information of one random Crypto-Currency
    - Click the 'Crypto-Currenty' Link
    - Click the Button on the 'Crypto-Currenty' page to update the trading price of the crypto-currency selected from the 'Introduction' page
    - Click the 'Crypto-Analysis' Link
    - Show the trading price and the trending price of the crypto-currency selected from the 'Introduction' page  

* Reference
    - https://javascripttricks.com/a-beginners-guide-to-simple-linear-regression-in-javascript-with-react-and-plotly-js-4e14d4f3455b
    - https://stackoverflow.com/questions/35022830/chart-js-change-label-orientation-on-x-axis-for-line-charts
    - https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    - https://stackoverflow.com/questions/11814013/css-creating-textured-backgrounds
    - https://projects.verou.me/css3patterns/#rainbow-bokeh
    - https://www.geeksforgeeks.org/floating-point-number-precision-in-javascript/
    - https://coinmarketcap.com/all/views/all/
                
                    


## [Step Five] Polishing The Application    
- Introduction page
![Introduction, snapshot][def1]

- Crypto-Currency page
![Currency, snapshot][def2]

- Crypto-Analysis page
![Analysis, snapshot][def3]

[def1]:snapshot_intro_rev01.png 
[def2]:snapshot_currency_rev01.png
[def3]:snapshot_analysis_rev01.png  