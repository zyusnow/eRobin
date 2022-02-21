
import "../StockPage.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getUserInfo } from "../../../store/session";
import { getHolding, putOrder } from "../../../store/holding";
import AddWatchlistTicker from "../../Modals/AddTickerToWatchlist";


const Transaction = ({ ticker, price }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id

    const holding = useSelector(state => state?.holding?.holding);
    const [renderPage, setRenderPage] = useState(true);

    const [buyingPower, setBuyingPower] = useState(0);
    const [stockShare, setStockShare] = useState(0);

    useEffect(() => {
        dispatch(getUserInfo(userId));
    }, [dispatch, userId, renderPage]);

    useEffect(() => {
        dispatch(getHolding(ticker.ticker, userId));
    }, [dispatch, ticker, userId, renderPage])

    useEffect(() => {
        if (sessionUser) {
            setBuyingPower(sessionUser.curr_balance)
        }

        if (holding) {
            setStockShare(holding.total_shares)
        }

    }, [sessionUser, holding])

    const [orderType, setOrderType] = useState("Buy");
    const [orderShare, setOrderShare] = useState(0);
    const [orderValue, setOrderValue] = useState(0);
    const [validOrder, setValidOrder] = useState(true);
    const [error, setError] = useState("")

    // track all input
    useEffect(() => {
        const tmpValue = price * orderShare
        const validInput = !isNaN(orderValue) && (orderValue > 0);
        // buy order
        if (orderType === "Buy") {
            if (tmpValue > buyingPower) {
                setError("Beyond buying power")
                setValidOrder(false)
            }
            else {
                setOrderValue(tmpValue)
                setError("")
                setValidOrder(true && validInput)
            }
        }
        // sell orderr
        else {
            if (orderShare > stockShare) {
                setError("Beyond owned share")
                setValidOrder(false)
            }
            else {
                setOrderValue(tmpValue)
                setError("")
                setValidOrder(true && validInput)
            }
        }

    }, [orderType, price, orderShare, buyingPower, stockShare, orderValue]);

    // order handler
    const handleOrder = async (e) => {
        e.preventDefault()
        // create order object for backend processing

        const orderInfo = {
            "userId": userId,
            "ticker": ticker.ticker,
            "price": price,
            "share": orderShare,
            "orderType": orderType
        }

        const res = await dispatch(putOrder(orderInfo));
        // here force re-render page
        if (res === "Success") {
            setOrderShare(0);
            setRenderPage(!renderPage);
        }

    }

    return (

            <div className="stock_right">
                <div className="stock_right_sub">
                    <form onSubmit={handleOrder}>
                        <div id="trans_header">
                            <select className="trans_header_opt" onChange={(e) => { setOrderType(e.target.value); setOrderShare(0) }}>
                                <option value="Buy">Buy</option>
                                <option value="Sell">Sell</option>
                            </select>
                        </div>
                        <div className="trans_section">
                            <div>Shares</div>
                            <input type="text" placeholder="0" required value={orderShare} onChange={(e) => setOrderShare(e.target.value)} />
                        </div>
                        <div className="trans_section">
                            <div>Market Price</div>
                            ${price}
                        </div>
                        <div className="trans_section">
                            <div>Total value</div>
                            <div>${isNaN(orderValue) ? 0 : orderValue.toLocaleString('en')}</div>
                        </div>
                        <button className={(validOrder) ? 'valid_order_btn' : 'unvalid_order_btn'} disabled={!validOrder}>{orderType}</button>
                        <div className="trans_erro">{error}</div>
                    </form>
                    <hr></hr>
                    <div className="trans_section portfolio">
                        <p>Buying power</p>
                        <div className="portfolio_value">${buyingPower.toLocaleString('en')}</div>
                    </div>
                    <div className="trans_section portfolio">
                        <p>Owned share</p>
                        <div className="portfolio_value">{stockShare}</div>
                    </div>
                <div>
                    <AddWatchlistTicker ticker={ticker.ticker}/>
                </div>
                </div>
            </div>
    )
}

export default Transaction
