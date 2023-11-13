import { useEffect, useCallback, useContext, useState } from 'react'

import axios from "axios";
import * as plotly from 'plotly.js-dist-min'

import styles from "./Analysis.module.css"
import {TradesContext} from "./AggTradesProvider";

function Analysis(){

    const {cryptoName} = useContext(TradesContext);

    const [cryptoSymbol, setCryptoSymbol] = useState(cryptoName);

    const [isTrendingComputed, setIsTrendingComputed] = useState(false);

    const mean = useCallback((pArray) => {

      if (!Array.isArray(pArray)) {
          console.log("pArray is not an array...");
          return 0;
      }
      if (pArray.length === 0) {
          console.log("pArray has zero length...");
          return 0;
      }    
      
      const sum = pArray.reduce((a, b) => a + b, 0);

      return sum / pArray.length;
    },[]);

    const coEfficientLeastSquared = useCallback((x, y) => {

        const meanOfTimestamps = mean(x);
        const meanOfPrices = mean(y);

        const epochs_centered = x.map(v=>v-meanOfTimestamps);
        const prices_centered = y.map(v=>v-meanOfPrices);

        const a11 = epochs_centered.map(v=>v**2).reduce((a,b) => a + b, 0);
        const a12 = epochs_centered.reduce((a,b) => a + b, 0);
        const a21 = a12;
        const a22 = epochs_centered.length;

        const b11 = epochs_centered.map((v,i)=>v*prices_centered[i]).reduce((a,b) => a + b, 0);
        const b21 = prices_centered.reduce((a,b) => a + b, 0);

        const slope_rev = (a22 * b11 - a12 * b21) / (a11 * a22 - a12 * a21);
 
        const intercept_rev = meanOfPrices - slope_rev * meanOfTimestamps;

      return [intercept_rev, slope_rev];
    }, [mean]);        
    
    const CreatePlot = useCallback((x, y, regressionLineX, regressionLineY) => {    
      const trace1 = {
        x: x.map(t=>parseTimestamp(t)),
        y: y,
        mode: 'markers',
        type: 'scatter',
        name: 'Data Points'
      }
  
      const trace2 = {
        x: regressionLineX.map(t=>parseTimestamp(t)),
        y: regressionLineY,
        mode: 'lines',
        type: 'scatter',
        name: 'Regression Line'
      }
  
      const plotdata = [trace1, trace2]
      const layout = {
        title: 'Trading Prices vs. Price Trending (Piece-wise Linear)',
        xaxis: { title: 'Epochs', automargin: "height" },
        yaxis: { title: 'Price' },
        width: 600,
        height: 450,
        paper_bgcolor: "#FFFF00"
      }
  
      plotly.newPlot('idPlot', plotdata, layout)
      }, []);
  
    const PlotPriceDataTrending = useCallback((priceArray) => {

            const x = priceArray.map((record) => record['T']);

            const y = priceArray.map((record) => +record['p']);

            const [intercept, slope] = coEfficientLeastSquared(x, y);
            
            const regressionLineX = x;

            const regressionLineY = x.map(val => slope * val + intercept);

            CreatePlot(x, y, regressionLineX, regressionLineY);

    }, [coEfficientLeastSquared, CreatePlot]);

  useEffect(() => {

    async function getCryptoData(){

        const response = await axios.get("https://data-api.binance.vision/api/v3/aggTrades", {
                        params: {
                            symbol: cryptoSymbol, 
                            limit: 100
                        }
                    });

        if (response.status === 200 && isTrendingComputed) {

            PlotPriceDataTrending(response.data);

        }

    }

    setCryptoSymbol(cryptoName);
    getCryptoData();

  },[cryptoName, cryptoSymbol, 
    isTrendingComputed,
    setCryptoSymbol, PlotPriceDataTrending]);

    function parseTimestamp(timeStamp){
      let a = new Date(timeStamp);
                    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    let year = a.getFullYear();
                    let month = months[a.getMonth()];
                    let date = a.getDate();
                    let hour = a.getHours();
                    let min = a.getMinutes();
                    let sec = a.getSeconds();
                    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                    return time;
    }
    
    
    function showAnalysis(event) {

        let symbolName = cryptoName;
        setCryptoSymbol(symbolName);
        setIsTrendingComputed(true);
    }

    return (
        <div className={styles["classDivAnalysis"]}>

            <button type = "submit"
                    className={styles["classBtnAnalysis"]}
                    onClick={(event) => 
                            showAnalysis(event)}>

                Analyze

            </button>
            
            <h1 className={styles["classDisplayTitleH1"]}> 
              Click to Analyze {cryptoSymbol} Trade Price Records and Trending Line
            </h1>

            <div className={styles["classDivLinearRegression"]}>
  
                <div id='idPlot'></div>

            </div>
        </div>
    )
}

export default Analysis;
