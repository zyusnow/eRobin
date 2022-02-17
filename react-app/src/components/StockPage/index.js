

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'
import { fetchStockInfo } from "../../store/stocks";
import "./StockPage.css";


const ReadMoreLess = ({ limit, children }) => {
    const about = children
    const [isMore, setIsMore] = useState(false);

    const toggleButton = () => {
        setIsMore(prevState => !prevState)
    }
    return (
        <div className="read_more">
            {isMore ? about : about.slice(0, limit)}
            <button className="read_more_btn" onClick={toggleButton}>{isMore ? "Read Less" : "Read More"}</button>
        </div>
    )
}

const StockPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const ticker = useParams();

    const sessionUser = useSelector(state => state?.session?.user);
    const stockInfo = useSelector(state => state.stocks.stockInfo);

    if (!sessionUser) {
        history.push('/login')
    }

    useEffect(() => {
        dispatch(fetchStockInfo(ticker))
    }, [dispatch, ticker])


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
    }


    return (

        <div className='stock_container'>
            <div className='stock_container_sub'>
                <div className="stock_left">
                    <div className="stock_header_container">
                        <div>{name}</div>
                        <div>${price}</div>
                    </div>

                    <hr></hr>
                    <h1>This is the chart</h1>
                    <h1>This is the chart</h1>
                    <h1>This is the chart</h1>
                    <hr></hr>

                    <div className="stock_info_container">
                        <div className="stock_info_header">About
                            <p>
                                <ReadMoreLess limit={580}>
                                    {about}
                                </ReadMoreLess>
                            </p>
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
                <div className="stock_right">
                    <h2>Buy and Sell</h2>
                </div>
            </div>
        </div>
    )
};

export default StockPage;
