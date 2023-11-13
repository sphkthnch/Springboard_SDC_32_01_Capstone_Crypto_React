import React, {useEffect, useMemo, useState, useCallback, useContext} from "react";
import axios from "axios";

import styles from "./Intro.module.css";
import {TradesContext} from "./AggTradesProvider";


function Intro() {

    const arrSymbols = useMemo(()=>[
            "BNBUSDT", "BTCBUSD", "YFIUSDT", "PAXGUSDT", "ETHDAI",
            "ZRXUSDT", "1INCHUSDT", "AAVEUSDT", "DOGEUSDT", 
            "PONDUSDT", "RENUSDT", "QNTUSDT", "XRPUSDT"],[]);

    const imagePerSymbol = useMemo(()=>({
        "BNBUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/1839.png",
        "BTCBUSD": "https://s2.coinmarketcap.com/static/img/coins/32x32/1.png",
        "YFIUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/5864.png",
        "PAXGUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/4705.png",
        "ETHDAI": "https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png",
        "ZRXUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/1896.png",
        "1INCHUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/8104.png",
        "AAVEUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/7278.png",
        "DOGEUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/74.png",
        "PONDUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/7497.png",
        "RENUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/2539.png",
        "QNTUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/3155.png",
        "XRPUSDT": "https://s2.coinmarketcap.com/static/img/coins/32x32/52.png"
    }), []);
    
    let {cryptoName,
        defineCryptoName, loadAggTradePrice, loadAggTradeQuantity, loadAggTradeEpoch} = useContext(TradesContext);

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
    
      const [randomCryptoIndex, setRandomCryptoIndex] = useState(0);

      let [tradeDataArray, setTradeDataArray] = useState([]);
  
      const [meanPrice, setMeanPrice] = useState(0);
  
      const [meanQuantity, setMeanQuantity] = useState(0);

    const populateCryptoInfo = useCallback((priceArray) => {

                setTradeDataArray(priceArray);

                setMeanPrice(mean(priceArray.map(v=>parseFloat(v.p))));
                loadAggTradePrice(priceArray.map(v=>parseFloat(v.p)));

                setMeanQuantity(mean(priceArray.map(v=>parseFloat(v.q))));
                loadAggTradeQuantity(priceArray.map(v=>parseFloat(v.q)));

                loadAggTradeEpoch(priceArray.map(v=>v.T));

    }, [mean,
        setTradeDataArray,
        setMeanPrice,
        loadAggTradePrice,
        setMeanQuantity,
        loadAggTradeQuantity,
        loadAggTradeEpoch]);

    

    useEffect(function(){
        
        async function getCryptoData() {

            let response = await axios.get("https://data-api.binance.vision/api/v3/aggTrades", {
                params: {
                    symbol:arrSymbols[randomCryptoIndex],
                    limit: 100
                }
            });

            if (response.status === 200 && isTrendingComputed) {

                defineCryptoName(arrSymbols[randomCryptoIndex]);

                populateCryptoInfo(response.data);
                
            }
        }

        getCryptoData();
       
    }, [tradeDataArray, setTradeDataArray,
        arrSymbols, randomCryptoIndex, mean,
        defineCryptoName,
        isTrendingComputed, populateCryptoInfo]);      

    function showIntro(event) {    

        let randomCryptoIndexUpdated = Math.floor(Math.random() * arrSymbols.length);
 
        setRandomCryptoIndex(randomCryptoIndexUpdated);

        defineCryptoName(arrSymbols[randomCryptoIndexUpdated]);

        setIsTrendingComputed(true);
    }

    return (
        <>
            <button type = "submit"
                    className={styles["classBtnCrypto"]}
                    onClick={(event) => 
                            showIntro(event)}>
                Show
            </button>
            
            <h1 className={styles["classDisplayTitleH1"]}>
                Click to Show Sample Crypto-Currency Information
            </h1>
                
            {tradeDataArray && tradeDataArray.length > 0 && isTrendingComputed? 
            <>
                
            <div className={styles["classDivIntro"]}>

                <img className={styles["classDivImg"]}
                     src={imagePerSymbol[cryptoName]}
                     height="120" alt={cryptoName}></img>

                <h2> Name: {arrSymbols[randomCryptoIndex]} </h2>
 
                <h2> Number of Trade Records: {tradeDataArray.length}</h2>

                <h2> Average Trade Price (USD): {meanPrice.toFixed(3)}</h2>
                
                <h2> Average Trade Quantities: {meanQuantity.toFixed(3)}</h2>
            </div>
            </>
            :""}
            
        </>
    )
}

export default Intro;
