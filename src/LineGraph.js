import React, { useState, useEffect, useMemo, useContext } from "react";
import queryString from "query-string";
import { key } from "./api";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { Context } from "./context/StockContext";
import "./Timeline.css";

const BASE_URL = "https://finnhub.io/api/v1/stock/candle";
const RESOLUTION = "D"

function getUnixTime(date) {
  return date.getTime() / 1000 | 0;
}

function transformData(data) {
  return data.c.map((item, index) => ({
    close: Number(item).toFixed(2),
    open: Number(data.o[index]).toFixed(2),
    timestamp: new Date(data.t[index] * 1000).toLocaleDateString()
  }))
}

function LineGraph({ casesType }) {
  const [data, setData] = useState({});
  const { symbol, interval, setInterval } = useContext(Context);

  const to = useMemo(() => {
    return getUnixTime(new Date());
  }, []);
  const from = useMemo(() => {
    let d = new Date();
    d.setDate(d.getDate() - interval);

    return getUnixTime(d);
  }, [interval])


  useEffect(() => {
    if (!from || !to || !symbol) {
      return;
    }

    const query = {
      token: key,
      resolution: RESOLUTION,
      from,
      to,
      symbol
    };

    fetch(`${BASE_URL}?${queryString.stringify(query)}`)
      .then(async data => setData(transformData(await data.json())))
      .catch(error => console.error(error))

  }, [from, to, symbol]);

  return (
    <div>
      <h2>{symbol}</h2>
      <h2>{interval}</h2>
      <div className="container">
        <LineChart width={900} height={500} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="timestamp" />
          <YAxis type="number" allowDecimals={true}
            allowDataOverflow={false} domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="open" stroke="green" dot={false} />
          <Line type="monotone" dataKey="close" stroke="gray" dot={false} />
        </LineChart>
      </div>
      <div className="timeline__container">
            <div className="timeline__buttons__container">
                <div className="timeline__button" onClick={() => setInterval(1)}>1D</div>
                <div className="timeline__button" onClick={() => setInterval(7)}>1W</div>
                <div className="timeline__button" onClick={() => setInterval(30)}>1M</div>
                <div className="timeline__button" onClick={() => setInterval(90)}>3M</div>
                <div className="timeline__button" onClick={() => setInterval(365)}>1Y</div>
            </div>
        </div>
    </div>
  );
}

export default LineGraph;
