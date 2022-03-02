import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getPortfolio } from "../../store/holding";

import Watchlist from '../List'
import News from "./news";
import StockGraph from "../StockGraph";
import './PortfolioPage.css'

function PortfolioPage({user}) {
    const portfolio = useSelector(state => state?.holding?.portfolio)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPortfolio(user.id))
    }, [dispatch, user])

    return (
        <div className="portfolio_container">
            <div className="portfolio_container_sub">
                <div className="portfolio_left">
                    <div className="portfolio_header">Welcome to eRobin</div>
                    {(portfolio) ? ((portfolio['date'].length >0) ? <StockGraph date={portfolio['date']} prices={portfolio['prices']} init_balance={user.init_balance}/>: <h3>Please search for stocks to buy.</h3>):
                    (<h4>Loading Chart...</h4>)}
                    <div className="buying_power_container">
                        Buying Power {user.curr_balance.toLocaleString('en')}
                    </div>
                    <News />
                </div>
                < Watchlist/>
            </div>
        </div>
    )
}

export default PortfolioPage
