import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getHolding } from '../../store/holding'
import Watchlist from '../Watchlist'
import './PortfolioPage.css'



function PortfolioPage() {
    const dispatch = useDispatch();

    // const holdings = useSelector(state => state?.holding?.holdings);
    // console.log(holdings)

    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id

    // useEffect(() => {
    //     dispatch(getHolding(userId));
    // }, [dispatch,userId])


    return (
        <div className="portfolio_container">
            <div className="portfolio_container_sub">
                <div className="portfolio_left">
                    <div className="portfolio_header">Welcome to eRobin</div>
                </div>
                < Watchlist />
            </div>
        </div>
    )
}

export default PortfolioPage
