import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { deleteWatchlistTicker, getUserWatchlists } from "../../store/watchlist";
import { getAllHoldings } from '../../store/holding'
import { FaPlus, FaMinus, FaLightbulb } from 'react-icons/fa';
import AddWatchlist from './AddWatchlist'
import WatchlistDropdownButton from "./WatchlistDropdownButton";
import '../PortfolioPage/PortfolioPage.css';

const Watchlist = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id

    const watchlists = useSelector(state => state?.watchlist?.watchlists);
    const watchlistsArr = Object.values(watchlists ? watchlists : {})

    const holdings = useSelector(state => state?.holding?.holdings);
    const holdingsArr = Object.values(holdings ? holdings : {})

    const [renderPage, setRenderPage] = useState(true);
    const [openNewForm, setOpenNewForm] = useState(false);


    const addWatchlist = (e) => {
        setOpenNewForm(true)
    }

    const deleteTicker = async (e) => {
        e.preventDefault();
        // currentTaregt will not go to deep div vs target
        const ticker = e.currentTarget.getAttribute('tickername')
        const tickerId = e.currentTarget.getAttribute('tickerid')

        const ticker_to_delete = await dispatch(deleteWatchlistTicker({ticker, tickerId}));
        if (ticker_to_delete) {
            setRenderPage(!renderPage)
        }
    }

    useEffect(() => {
        dispatch(getUserWatchlists(userId));
    }, [dispatch, renderPage, userId])


    useEffect(() => {
        dispatch(getAllHoldings(userId));
    }, [dispatch, renderPage, userId])

    return (
        <div className="portfolio_right">
            <div className="portfolio_right_sub">
                <div className="portf_header">
                    <span>My stock</span>
                </div>
                <div className="holdings_outer_contanier">
                {holdings && holdingsArr.map((holding) => (
                    <div className="holdings_contanier" key={holding.id}>
                        <div className="holding_info">
                            <Link className="wl_ticker" to={`/stocks/${holding.ticker}`}><span>{holding.ticker}</span></Link>
                            <div className="holding_shares">{holding.total_shares} shares</div>
                        </div>
                        <div>
                            {holding.avg_price.toLocaleString('en')}
                        </div>
                    </div>
                ))}
                </div>

                <div className="portf_header">
                    <span>Watchlist</span>
                    <FaPlus className='add_btn' onClick={addWatchlist} />
                </div>
                <div>
                    {openNewForm === true && (
                        <AddWatchlist setOpenNewForm={setOpenNewForm}
                            setRenderPage={setRenderPage} renderPage={renderPage} />
                    )}
                </div>
                <div>
                    {watchlists && watchlistsArr.map((watchlist) => (
                        <div className="watchlists_contanier" key={watchlist.id}>
                            <div className="watchlists_menu_container">
                                <div className="watchlists_header_container">
                                    <div className="watchlists_header_sub">
                                        <FaLightbulb className="fa bulb"/>
                                        {watchlist.name}
                                    </div>
                                    <div className="watchlists_header_container_right">
                                        <WatchlistDropdownButton watchlistId={watchlist.id} renderPage={renderPage} setRenderPage={setRenderPage} />
                                    </div>
                                </div>
                            </div>
                            <div className="tickers_container">
                                {watchlist.watchlist_tickers.length > 0 && watchlist?.watchlist_tickers.map((ticker) => (
                                    <div className="tickers_container_inner" key={ticker.id}>
                                        <button type="button" className="w_btn" tickername={ticker.ticker} tickerid={ticker.id} onClick={deleteTicker}>
                                            <FaMinus/>
                                        </button>
                                        <Link className="wl_ticker" to={`/stocks/${ticker.ticker}`}><span>{ticker.ticker}</span></Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Watchlist
