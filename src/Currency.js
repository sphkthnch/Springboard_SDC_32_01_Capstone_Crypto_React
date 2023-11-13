import React, {useState, useEffect, useContext, useCallback} from "react";
import axios from "axios";

import {TradesContext} from "./AggTradesProvider";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';

import styles from "./Currency.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function Currency() {

    const {cryptoName, loadAggTradePrice} = useContext(TradesContext);

    const cryptoSymbol = cryptoName === ""?"BNBUSDT" : cryptoName;

    const [chartOptions, setChartOptions] = useState({});

    const [isTrendingComputed, setIsTrendingComputed] = useState(false);

    const [chartData, setChartData] = useState({
       labels: [],
       datasets: [] 
    });

    const populateChartLabelsDatasets = useCallback((tradeData)=>{

        loadAggTradePrice(tradeData.map(v=>parseFloat(v.p)));
                
                chartData.labels = tradeData.map((data) => {
                    let a = new Date(data.T);
                    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    let year = a.getFullYear();
                    let month = months[a.getMonth()];
                    let date = a.getDate();
                    let hour = a.getHours();
                    let min = a.getMinutes();
                    let sec = a.getSeconds();
                    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                    return time;
                });
                chartData.datasets = [
                    {
                    label: "Data Source: Binance API, Aggregate Trade Price",    
                    data: tradeData.map((data) => data.p),
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                    ],
                    borderColor: "black",
                    borderWidth: 2
                    }
                ];

                setChartOptions({
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Trade Price (y-axis) vs. Time Epochs (x-axis)',
                      },
                    
                    },
    
                    scales: {
                        x: {
                            ticks: {
                                maxRotation: 90,
                                minRotation: 90
                            }
                        }
                    }
                });
                setChartData(chartData);
    },[loadAggTradePrice, 
        setChartData, chartData]);

    useEffect(function(){
        async function setCryptoChart(){

            const response = await axios.get("https://data-api.binance.vision/api/v3/aggTrades", {
                            params: {
                                symbol:cryptoSymbol,
                                limit: 100
                            }
                        });

            if (response.status === 200 && isTrendingComputed) {

                populateChartLabelsDatasets(response.data);
                
            }
        }

        setCryptoChart();
        

    }, [chartOptions, setChartOptions,
        chartData, setChartData,
        cryptoName,
        loadAggTradePrice,
        cryptoSymbol,
        isTrendingComputed, 
        populateChartLabelsDatasets]);

    async function showCurrency(event) {
     
        event.preventDefault();

        setChartData({
            labels: [],
            datasets: [] 
         });

         setIsTrendingComputed(true);
    }

    return (
        <div className={styles["classDivCurrency"]}>
            <button type = "submit"
                    className={styles["classBtnCurrency"]}
                    onClick={(event) => 
                            showCurrency(event)}>
                Plot
            </button>
            <h1 className={styles["classDisplayTitleH1"]}>
                Click to Plot Recent History of {cryptoSymbol} Trading Price
            </h1>
            {isTrendingComputed?
                <div className={styles["classDivChart"]}>
    
                    <Line options={chartOptions} data={chartData} />
                </div>:""
            }
        </div>
    )
}

export default Currency;