import "./StockPage.css"

import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getStockDetails } from "../../store/stocks";
// import { editStonk, getStockDetails, sellStonk, buyStonk } from '../../store/stockDetails';
// import { loadUserPortfolios } from '../../store/portfolio';
// import { addWatchlistTicker } from '../../store/watchlistTickers';
import StockGraph from "../StockGraph"
// import "./index.css"
// import AddToWatchlist from './addToWatchlist'
// import { loadUserWatchlists } from '../../store/watchlists';

const StockPage = () => {
    const dispatch = useDispatch();
    const ticker = useParams();
    const ref = useRef();
    // const ref = useRef()
    // const thisTicker = useParams()
    const user = useSelector(state => state.session.user);
    const stockDetails = useSelector(state => state.stocks.stockDetails);
    // const tickerReducer = useSelector(state => state.watchlistTickerReducer)
    // const [showAddButton, setShowAddButton] = useState(false)
    // const [tickerExists, setTickerExists] = useState(true)
    // const watchlists = useSelector(state => state.watchlistReducer)

    // useEffect(() => {
    //     async function getWatchlists() {
    //         await dispatch(loadUserWatchlists(user.id))
    //     }
    //     getWatchlists()
    // }, [dispatch])

    const [cost, setCost] = useState(0)

    // const Graph2Style = {
    //     width: '80%'
    // }

    useEffect(() => {
        dispatch(getStockDetails(ticker))
    }, [dispatch, ticker])

    let date = []
    let prices = []
    let price = ""
    let name = ""
    let sector = ""
    let marketcap = ""
    let peRatio = ""

    if (stockDetails){
        date = stockDetails["date"]
        prices = stockDetails["prices"]

        price = stockDetails["price"]
        name = stockDetails["name"]
        // let about = stockDetails["about"]
        // let employees = stockDetails["employees"]
        // let city = stockDetails["city"]
        // let state = stockDetails["state"]
        sector = stockDetails["sector"]
        // let volume = stockDetails["volume"]
        // let avgVolume = stockDetails["avgvolume"]
        marketcap = stockDetails["marketcap"]
        peRatio = stockDetails["peratio"]
    }

    return (

        <div className='stock-detail-container'>
            <h1 id='title'>{name}</h1>
            <div className='Order66'>
                <button className="button-82-pushable2">
                    <span className="button-82-shadow2"></span>
                    <span className="button-82-edge2"></span>
                    <span className="button-82-front2 text">
                        Buy
                    </span>
                </button>
                {/* <button id='buybutton' onClick={handleBuy}>Buy</button> */}
                <span id='buyprice'>$ {cost.toFixed(2)}</span>
                <input placeholder='quantity' onChange={e => setCost((e.target.value * price))} type='number' min='0' ref={ref} />
                <span id='sellprice'>-$ {cost.toFixed(2)}</span>
                {/* <button onClick={handleSell} id='sellbutton'>Sell</button> */}
                <button className="button-82-pushable">
                    <span className="button-82-shadow"></span>
                    <span className="button-82-edge"></span>
                    <span className="button-82-front text">
                        Sell
                    </span>
                </button>
            </div>

            <div className='graph-title'>
                <div className="stock__detail__graph">
                    <StockGraph dates={date} values={prices} width='40%'/>
                </div>
            </div>

            <h2>Key Stats</h2>
            <div className='all-kpi'>
                <div className='kpi'><p>Name:</p> {name}</div>
                <div className='kpi'><p>Price:</p> {price}</div>
                <div className='kpi'><p>Market Cap:</p> {marketcap}</div>
                <div className='kpi'><p>P/E Ratio</p> {peRatio}</div>
                <div className='kpi'><p>Sector:</p> {sector}</div>
            </div>

        </div>

    )
};

export default StockPage;
