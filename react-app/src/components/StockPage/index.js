import "./StockPage.css"

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom'

import { fetchStockInfo } from "../../store/stocks";

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


    if (stockInfo) {
        price = stockInfo["price"]
        name = stockInfo["name"]
    }

    return (

        <div className='stock-detail-container'>
            <div>Name:{name}</div>
            <div>Price:{price}</div>
            <div>P/E Ratio:{name}</div>
        </div>
    )
};

export default StockPage;
