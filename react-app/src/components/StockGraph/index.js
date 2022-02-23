import React from 'react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import './StockGraph.css'

export default function StockGraph({ date, prices, init_balance }) {
    //console.log(date)
    //console.log(prices)
    const [showPeriod, setShowPeriod] = useState(90)
    const [minValue, setMinValue] = useState(Math.min(prices))
    const [maxValue, setMaxValue] = useState(Math.max(prices))

    const data = date.map((d, idx) => ({ 'date': d, 'value': prices[idx] }));

    const customToolTip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="tooltip">
                    <p>{label}</p>
                    <p>${payload[0].value.toLocaleString('en')}</p>
                    {init_balance && (<p>Profit: {((payload[0].value-init_balance)*100/init_balance).toLocaleString('en')+ "%"}</p>)}
                </div>
            )
        }
        return null;
    }

    useEffect(() => {
        if (data) {
            const showData = prices.slice(-showPeriod);
            const minValue = parseInt(Math.min(...showData) * 0.99);
            const mavValue = parseInt(Math.max(...showData) * 1.01);
            // console.log("hihi", showData)
            // console.log(minValue);
            // console.log(maxValue)

            setMinValue(minValue);
            setMaxValue(mavValue);
        }
    }, [showPeriod, data]);

    return (
        <div className='stock-graph'>
            <LineChart
                width={600}
                height={300}
                data={data.slice(-showPeriod)}>

                <XAxis
                    dataKey="date"
                    hide={true} />
                <YAxis
                    dataKey="value"
                    hide={true}
                    domain={[minValue, maxValue]} />
                <Tooltip
                    isAnimationActive={true}
                    content={customToolTip}
                />
                <Line
                    type="linear"
                    dataKey="value"
                    stroke="#29c446"
                    activeDot={{ r: 5 }}
                    dot={false}
                    strokeWidth={1}
                />
            </LineChart>
            <div className='time_period_container'>
                <span><button onClick={() => setShowPeriod(7)}>1W</button></span>
                <span><button onClick={() => setShowPeriod(30)}>1M</button></span>
                <span><button onClick={() => setShowPeriod(90)}>3M</button></span>
            </div>
        </div>
    )
}
