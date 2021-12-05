import React, { useContext } from "react";
import StockChart from './stock.svg'
import { Context } from './context/StockContext';

function StatsRow(props) {
  const percentage = ((props.price - props.openPrice)/props.openPrice) * 100;
  const { setSymbol, setCurrent, setChange } = useContext(Context);

  const changeSymbol = () => {
    setSymbol(props.name);
    setCurrent(props.price);
    setChange(Number(percentage).toFixed(2));
  }

  return (
    <div className="row" onClick={changeSymbol}>
      <div className="row__intro">
        <h1>{props?.name}</h1>
        <p>{props.volume && 
          (props.volume + " shares")
        }</p>
      </div>
      <div className="row__chart">
        <img src={StockChart} height={16}/>
      </div>
      <div className="row__numbers">
        <p className="row__price">{props.price}</p>
        <p className="row__percentage"> +{Number(percentage).toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default StatsRow;
