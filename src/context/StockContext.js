import React, { useState, createContext } from "react";

export const Context = createContext();

const STOCK_SYMBOLS = ["TSLA", "MSFT", "DIS", "SBUX", "SNAP", "AAPL"]
const INTERVAL_OPTIONS = [30, 60, 90, 120, 365]

export const ContextProvider = (props) => {
    const [symbol, setSymbol] = useState(STOCK_SYMBOLS[0])
    const [interval, setInterval] = useState(INTERVAL_OPTIONS[0])
    const [current, setCurrent] = useState(0);
    const [change, setChange] = useState(0);

    const value = {
        symbol,
        setSymbol,
        interval,
        setInterval,
        current,
        setCurrent,
        change,
        setChange,
    }

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
}