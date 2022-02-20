import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Modal} from '../../../Context/Modal'
import { deleteUserWatchlist } from '../../../store/watchlist';
import { FaTrashAlt } from 'react-icons/fa';

function DeleteWatchlistModal(watchlistId) {
        const dispatch = useDispatch();
        const [showModal, setShowModal] = useState(false);

        const handleDelete = (e) => {
            e.preventDefault();
            const watchlist_to_delete = dispatch(deleteUserWatchlist(watchlistId));
            setShowModal(false);
            if (watchlist_to_delete) {
                window.location.reload()
            }
        }
        return (
            <div>
                <button className='delete_btn' onClick={() => setShowModal(true)}>
                            <FaTrashAlt className='edit_watchlist_btn' />
                            Delete watchlist
                        </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <h3>Are you sure you want to delete this watchlist?</h3>
                        <p>Items in the watchlist will be deleted as well!</p>
                        <div className='delete_confirm_container'>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <form  onSubmit={handleDelete}>
                                <button className="button_submit buttton_confirm"type="submit">Confirm</button>
                            </form>
                        </div>
                    </Modal>
                )}
            </div>
        )
}

export default DeleteWatchlistModal
