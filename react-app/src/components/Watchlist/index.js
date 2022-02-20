import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { deleteWatchlistTicker, getUserWatchlists } from "../../store/watchlist";
import { FaPlus, FaMinus } from 'react-icons/fa';
import AddWatchlist from '../Watchlist/AddWatchlist'
import WatchlistDropdownButton from "./WatchlistDropdownButton";
import '../PortfolioPage/PortfolioPage.css';

const Watchlist = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id

    const watchlists = useSelector(state => state?.watchlist?.watchlists);
    const watchlistsArr = Object.values(watchlists ? watchlists : {})

    const [renderPage, setRenderPage] = useState(true);
    const [openNewForm, setOpenNewForm] = useState(false);

    const addWatchlist = (e) => {
        setOpenNewForm(true)
    }

    const deleteTicker = async (e) => {
        e.preventDefault();
        const ticker = e.target.getAttribute('tickername')
        const tickerId = e.target.getAttribute('tickerid')

        console.log(ticker)
        console.log(tickerId)

        const ticker_to_delete = await dispatch(deleteWatchlistTicker({ticker, tickerId}));
        if (ticker_to_delete) {
            setRenderPage(!renderPage)
        }
    }

    useEffect(() => {
        dispatch(getUserWatchlists(userId));
    }, [dispatch, renderPage, userId])

    return (
        <div className="portfolio_right">
            <div className="portfolio_right_sub">
                <div className="portf_header">
                    Watchlist
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
                                {watchlist.name}
                                <WatchlistDropdownButton watchlistId={watchlist.id} renderPage={renderPage} setRenderPage={setRenderPage} />
                            </div>
                            <div className="tickers_container">
                                {watchlist.watchlist_tickers.length > 0 && watchlist?.watchlist_tickers.map((ticker) => (
                                    <div className="tickers_container_inner" key={ticker.id}>
                                        <div>{ticker.ticker}</div>
                                        <button type="button" className="w_btn" ><i className="fa fa-close" tickername={ticker.ticker} tickerid={ticker.id} onClick={deleteTicker}/></button>
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
