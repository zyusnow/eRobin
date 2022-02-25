import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal'
import { addWatchlistTicker, getUserWatchlists } from '../../../store/watchlist';
import { FaPlus, FaCheck, FaLightbulb } from 'react-icons/fa';


function AddWatchlistTicker({ ticker }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id

    const watchlists = useSelector(state => state?.watchlist?.watchlists);
    const watchlistsArr = Object.values(watchlists ? watchlists : {})

    const [renderPage, setRenderPage] = useState(false)

    // control whether the ticker was added
    const [tickerAdded, setTickerAdded] = useState(false);
    // control which watch list has this ticker
    const [watchListAdded, setWatchListAdded] = useState([]);

    useEffect(() => {
        dispatch(getUserWatchlists(userId));
    }, [dispatch, userId, renderPage])

    useEffect(() => {
        let wlList = [];
        let tickerFound = false;
        if (watchlists) {
            for (let watchlist of watchlistsArr) {
                let hasTicker = false;
                for (let wlTicker of watchlist['watchlist_tickers']) {
                    const tickerName = wlTicker.ticker;
                    if (ticker === tickerName) {
                        hasTicker = true;
                        tickerFound = true;
                        break;
                    }
                }
                wlList.push({ 'id': watchlist.id, 'name': watchlist.name, "hasTicker": hasTicker, "ticker": ticker })
            };
            // now check whether the current ticker exists
            setTickerAdded(tickerFound);
            setWatchListAdded(wlList);
        }
    }, [watchlists, ticker, renderPage])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(addWatchlistTicker(watchListAdded));
        setShowModal(false);

        if (res === "Success") {
            setRenderPage(!renderPage)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setShowModal(false)
    }

    // a specific function to allow multiple selection without holding ctrl
    const handleChange = (e) => {
        // unselect -> remove it from list
        if (e.target.checked !== true) {
            // first find the index of matched object
            const idx = watchListAdded.findIndex((obj => obj.name === e.target.value));
            watchListAdded[idx]['hasTicker'] = false;
        }
        // select -> add it to the list
        else {
            const idx = watchListAdded.findIndex((obj => obj.name === e.target.value));
            watchListAdded[idx]['hasTicker'] = true;
        }
        e.target.defaultChecked = !e.target.defaultChecked;
        setWatchListAdded(watchListAdded);
    }

    return (
        <div>
            <button className='btn' onClick={() => setShowModal(true)}>
                {tickerAdded ? <FaCheck className='edit_watchlist_logo' /> : <FaPlus className='edit_watchlist_logo' />}
                Add to watchlist
            </button>
            {(showModal === true) && (
                <Modal className="add_outer_container" onClose={() => setShowModal(false)}>
                    <div>
                        <h2>Add to your lists</h2>
                        <div className='add_inner_container'>
                            {watchlists && watchListAdded.map((wl) => (
                                <div key={wl.name} className="add_watchlists_container">
                                    <input className="check_box" type="checkbox" id={wl.name} name={wl.name} value={wl.name} defaultChecked={wl.hasTicker} onChange={handleChange} />
                                    <div className='add_watchlists'>
                                        <FaLightbulb className='watchlist_logo' />
                                        <label className='label'> {wl.name} </label>
                                    </div>


                                </div>
                            ))}
                        </div>

                        <div className='add_confirm_container'>
                            <button className="btn cancel" onClick={handleCancel}>Cancel</button>
                            <form onSubmit={handleSubmit}>
                                <button className="btn confirm" type="submit">Confirm</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default AddWatchlistTicker
