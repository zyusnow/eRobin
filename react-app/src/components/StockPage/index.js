

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { fetchStockInfo } from "../../store/stocks";
import "./StockPage.css";
import Transaction from "./Transaction";
import StockGraph from "../StockGraph";



const ReadMoreLess = ({ limit, children }) => {
    const about = children ? children : ""
    const [isMore, setIsMore] = useState(false);

    const toggleButton = () => {
        setIsMore(prevState => !prevState)
    }
    return (
        <p className="read_more">
            {isMore ? about : about.slice(0, limit)}
            <button className="read_more_btn" onClick={toggleButton}>{isMore ? "Read Less" : "...Read More"}</button>
        </p>
    )
}

const StockPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const ticker = useParams();

    const sessionUser = useSelector(state => state?.session?.user);
    const stockInfo = useSelector(state => state.stocks.stockInfo);

    if (!sessionUser) {
        history.push('/login');
    }

    // get stock info
    useEffect(() => {
        dispatch(fetchStockInfo(ticker));
    }, [dispatch, ticker]);

    let date = []
    let prices = []

    let price = ""
    let name = ""
    let about = ""
    let employees = ""
    let country = ""
    let sector = ""
    let marketcap = ""
    let peratio = ""


    if (stockInfo) {
        price = stockInfo["price"]
        name = stockInfo["name"]
        about = stockInfo["about"]
        employees = stockInfo["employees"]
        country = stockInfo["country"]
        sector = stockInfo["sector"]
        marketcap = stockInfo["marketcap"]
        peratio = stockInfo["peratio"]
        date = stockInfo["date"]
        prices = stockInfo["prices"]
    }
    // console.log(date)
    // console.log(prices)

    return (
        <div className='stock_container'>
            <div className='stock_container_sub'>
                {stockInfo && (
                <>
                    <div className="stock_left">
                        <div className="stock_header_container">
                            <div>{name}</div>
                            <div>${price}</div>
                        </div>

                        {date.length > 0 ? (<StockGraph date={date} prices={prices}/>) : (<h3> Beyond backend api limit. Please revisit the page in the next minute</h3>)}

                        <div className="stock_info_container">
                            <div className="stock_info_header">About
                                <div>
                                    <ReadMoreLess limit={580}>
                                        {about}
                                    </ReadMoreLess>
                                </div>
                            </div>
                            <div className="stock_info_content">
                                <div>Employees<p>{employees}</p></div>
                                <div>Country<p>{country}</p></div>
                                <div>Sector<p>{sector}</p></div>
                            </div>
                        </div>
                        <div className="stock_info_header">Key statistics</div>
                        <div className="stock_info_content">
                            <div>Marketcap<p>{marketcap}</p></div>
                            <div>P/E Ratio<p>{peratio}</p></div>
                        </div>
                    </div>

                            <Transaction ticker={ticker} price={price} />

                 </>
                )}
            </div>
        </div>
    )
};

export default StockPage;
