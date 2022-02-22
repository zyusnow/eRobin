import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import Watchlist from '../List'
import News from "./news";
import './PortfolioPage.css'
function PortfolioPage() {

    const sessionUser = useSelector(state => state?.session?.user);



    return (
        <div className="portfolio_container">
            <div className="portfolio_container_sub">
                <div className="portfolio_left">
                    <div className="portfolio_header">Welcome to eRobin</div>
                    <h1>This is chart</h1>
                    <h1>This is chart</h1>
                    <h1>This is chart</h1>
                    <div className="buying_power_container">
                        Buying Power {sessionUser.curr_balance.toLocaleString('en')}
                    </div>
                    <News />
                </div>
                < Watchlist/>
            </div>
        </div>
    )
}

export default PortfolioPage
