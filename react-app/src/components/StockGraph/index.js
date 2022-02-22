import React from 'react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

export default function StockGraph({date, prices}) {
    const [showPeriod, setShowPeriod] = useState(90)
    const [minValue, setMinValue] = useState(Math.min(prices))
    const [maxValue, setMaxValue] = useState(Math.max(prices))

    const data = date.map((d, idx) => ({'date':d, 'value':prices[idx]}));

    const customToolTip = ({ active, payload, label }) => {
        if (active) {
        return (
            <div className="tooltip">
            <p>{label}</p>
            <p>${payload[0].value.toLocaleString('en')}</p>
            </div>
        )
        }
        return null;
    }

    useEffect(() => {
        if (data){
            const showData = prices.slice(-showPeriod);
            const minValue = parseInt(Math.min(...showData) * 0.99);
            const mavValue = parseInt(Math.max(...showData) * 1.01);

            // console.log(minValue);
            // console.log(maxValue)

            setMinValue(minValue);
            setMaxValue(mavValue);
        }
    }, [showPeriod, data]);

    return (
        <div className='stock-graph'>
        {/* <ResponsiveContainer width="99%" height={300}> */}
        <LineChart
        // margin={{
        //   top: 100,
        // }}
        width={600}
        height={300}
        data={data.slice(-showPeriod)}>
        {/* data={dailyData(data)}> */}
        <XAxis
            dataKey="date"
            hide={true} />
        <YAxis
            dataKey="value"
            hide={true}
            domain={[minValue, maxValue]}/>
        <Tooltip
            // offset={0}
            // position={{ y: 0 }}
            isAnimationActive={true}
            // allowEscapeViewBox={{ x: true, y: true }}
            content={customToolTip}
            // wrapperStyle={{ top: 0 }}
            // position={{ x: 'auto', y: 80 }}
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
        {/* </ResponsiveContainer> */}
            <div>
                <span><button onClick={() => setShowPeriod(7)}>1W</button></span>
                <span><button onClick={() => setShowPeriod(30)}>1M</button></span>
                <span><button onClick={() => setShowPeriod(90)}>3M</button></span>
            </div>
        </div>
    )
}
