import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Modal} from '../../../context/Modal'
import { deleteUserWatchlist } from '../../../store/watchlist';
import { FaTrashAlt } from 'react-icons/fa';
import '../../../context/Modal.css'

function DeleteWatchlistModal({watchlistId, renderPage, setRenderPage, setShowMenu}) {
        const dispatch = useDispatch();
        const [showModal, setShowModal] = useState(false);

        const handleDelete = async (e) => {
            e.preventDefault();
            const watchlist_to_delete = await dispatch(deleteUserWatchlist(watchlistId));
            setShowModal(false);
            if (watchlist_to_delete) {
                setShowModal(false)
                setRenderPage(!renderPage)
                setShowMenu(false)
            }
        }

        const handleCancel = (e) => {
            e.preventDefault();
            setShowModal(false)
            setShowMenu(false)
        }
        return (
            <div>
                <button className='delete_btn' onClick={() => setShowModal(true)}>
                    <FaTrashAlt className='edit_watchlist_btn' />
                    Delete watchlist
                </button>
                {(showModal === true) && (
                    // <h1>test</h1>
                    <Modal onClose={() => setShowModal(false)}>
                        <div className='delet_modal'>
                            <h3>Are you sure you want to delete this watchlist?</h3>
                            <p>Items in the watchlist will be deleted as well!</p>
                            <div className='delete_confirm_container'>
                                <button onClick={handleCancel}>Cancel</button>
                                <form  onSubmit={handleDelete}>
                                    <button className="button_submit buttton_confirm"type="submit">Confirm</button>
                                </form>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        )
}

export default DeleteWatchlistModal
