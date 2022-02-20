import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getUserInfo } from "../../store/session";
import { getUserWatchlists } from "../../store/watchlist";
import { FaPlus, FaRegEdit,FaTrashAlt, FaEllipsisH } from 'react-icons/fa';
import '../PortfolioPage/PortfolioPage.css';
import AddWatchlist from '../Watchlist/AddWatchlist'
import WatchlistDropdownButton from "./WatchlistDropdownButton";

const Watchlist = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id

    const watchlists = useSelector(state => state?.watchlist?.watchlists);
    // since watchlist is not an array, need to convert to array first
    const watchlistsArr = Object.values(watchlists ? watchlists : {})

    const [renderPage, setRenderPage] = useState(true);
    const [openNewForm, setOpenNewForm] = useState(false);

    const addWatchlist = (e) => {
        setOpenNewForm(true)
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
                            {watchlist.name}
                            <WatchlistDropdownButton watchlistId={watchlist.id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Watchlist
