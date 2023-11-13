import { createContext,  useState, useCallback} from "react";

const INITIAL_TRADES = {
    cryptoName: "ETHDAI",
    priceArray: [],
    quantityArray: [],
    epochArray: [],
    defineCryptoName: function (name) {INITIAL_TRADES.cryptoName = name;},
    loadAggTradePrice: function (pArray) {INITIAL_TRADES.priceArray = pArray;},
    loadAggTradeQuantity: function (quantityArray) {INITIAL_TRADES.quantityArray = quantityArray;},
    loadAggTradeEpoch: function (epochArray) {INITIAL_TRADES.epochArray = epochArray;}
};

export const TradesContext = createContext(INITIAL_TRADES);

function AggTradesProvider({children}){
    
    console.log("[AggTradesProvider], children: ", children);

    const [cryptoName, setCryptoName] = useState(INITIAL_TRADES.cryptoName);
    const [priceArray, setPriceArray] = useState(INITIAL_TRADES.priceArray);
    const [quantityArray, setQuantityArray] = useState(INITIAL_TRADES.quantityArray);
    const [epochArray, setEpochArray] = useState(INITIAL_TRADES.epochArray);

    const defineCryptoName = useCallback((name) => {
        setCryptoName(name);
    }, []
    );

    const loadAggTradePrice = useCallback((pArray) => {
        setPriceArray(pArray);
    }, []
    );

    const loadAggTradeQuantity = useCallback((quantityArray) => {
        setQuantityArray(quantityArray);
    }, []
    );

    const loadAggTradeEpoch = useCallback((epochArray) => {
        setEpochArray(epochArray);
    }, []
    );

    return (
        <TradesContext.Provider 
            value={{cryptoName, priceArray, quantityArray, epochArray,
                defineCryptoName, loadAggTradePrice, loadAggTradeQuantity, loadAggTradeEpoch}}>
            {children}
        </TradesContext.Provider>
    );
}

export default AggTradesProvider;