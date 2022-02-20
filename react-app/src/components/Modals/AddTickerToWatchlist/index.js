import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Modal} from '../../../context/Modal'
import { addWatchlistTicker } from '../../../store/watchlist';
import { FaPlus } from 'react-icons/fa';
import '../../../context/Modal.css'

function AddWatchlistTicker({renderPage, setRenderPage}) {
        const dispatch = useDispatch();
        const [showModal, setShowModal] = useState(false);

        const handleCancel = (e) => {
            e.preventDefault();
            setShowModal(false)
        }
        return (
            <div>
                <button className='add_watchlist_container' onClick={() => setShowModal(true)}>
                    <FaPlus className='edit_watchlist_btn' />
                    Add to watchlist
                </button>
                {(showModal === true) && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className='delet_modal'>
                            <h3>Add to your lists</h3>
                            <div className='delete_confirm_container'>
                                <button onClick={handleCancel}>Cancel</button>
                                <form  onSubmit={handleCancel}>
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
