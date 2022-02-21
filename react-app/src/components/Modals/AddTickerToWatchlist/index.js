import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Modal} from '../../../context/Modal'
import { addWatchlistTicker, getUserWatchlists } from '../../../store/watchlist';
import { FaPlus, FaCheck} from 'react-icons/fa';
import '../../../context/Modal.css'


function AddWatchlistTicker({ticker}) {
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
            if (watchlists){
                for (let watchlist of watchlistsArr){
                    let hasTicker = false;
                    for (let wlTicker of watchlist['watchlist_tickers']){
                        const tickerName = wlTicker.ticker;
                        if (ticker === tickerName){
                            hasTicker = true;
                            tickerFound = true;
                            break;
                        }
                    }
                    wlList.push({'id': watchlist.id, 'name': watchlist.name, "hasTicker": hasTicker, "ticker": ticker})
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

            if (res === "Success"){
                setRenderPage(!renderPage)
            }

        }

        const handleCancel = (e) => {
            e.preventDefault();
            setShowModal(false)
        }

        // a specific function to allow multiple selection without holding ctrl
        const handleChange = (e) =>  {
            // unselect -> remove it from list
            if (e.target.checked !== true){
                //console.log("unselect")
                // first find the index of matched object
                const idx = watchListAdded.findIndex((obj => obj.name === e.target.value));
                watchListAdded[idx]['hasTicker'] = false;
            }
            // select -> add it to the list
            else{
                //console.log("select")
                const idx = watchListAdded.findIndex((obj => obj.name === e.target.value));
                watchListAdded[idx]['hasTicker'] = true;
            }
            e.target.defaultChecked = !e.target.defaultChecked;
            setWatchListAdded(watchListAdded);
        }

        return (
            <div>
                <button className='add_watchlist_container' onClick={() => setShowModal(true)}>
                    {tickerAdded ? <FaCheck className='edit_watchlist_btn' /> : <FaPlus className='edit_watchlist_btn' />}
                    Add to watchlist
                </button>
                {(showModal === true) && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className='delet_modal'>
                            <h3>Add to your lists</h3>
                            {watchlists && watchListAdded.map((wl) => (
                                <div>
                                    <input type="checkbox" id={wl.name} name={wl.name} value={wl.name} defaultChecked={wl.hasTicker} onChange={handleChange}/>
                                    <label> {wl.name} </label>
                                </div>
                            ))}

                            <div className='delete_confirm_container'>
                                <button onClick={handleCancel}>Cancel</button>
                                <form  onSubmit={handleSubmit}>
                                    <button className="button_submit buttton_confirm"type="submit">Confirm</button>
                                </form>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        )
}

export default AddWatchlistTicker
