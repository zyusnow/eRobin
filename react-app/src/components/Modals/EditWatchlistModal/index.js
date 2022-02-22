import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FaRegEdit } from 'react-icons/fa';
import { Modal } from '../../../context/Modal'
import { editUserWatchlist } from '../../../store/watchlist'
import '../../../context/Modal.css'

function EditWatchlistModal({ watchlistId, renderPage, setRenderPage, setShowMenu }) {
    const dispatch = useDispatch()
    const watchlist = useSelector(state => state.watchlist?.watchlists[+watchlistId])

    const [showEditModal, setShowEditModal] = useState(false);
    const [name, setName] = useState(watchlist?.name)
    const [errors, setErrors] = useState([])

    const updatedWatchlist = async (e) => {
        e.preventDefault()

        const watchlistInfo = {
            watchlistId,
            name
        }

        const data = await dispatch(editUserWatchlist(watchlistInfo))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setShowEditModal(false)
            setRenderPage(!renderPage)
            setShowMenu(false)
        }

    }

    const handleCancel = (e) => {
        e.preventDefault();
        setShowEditModal(false)
        setShowMenu(false)
    }

    return (
        <>
            <div>
                <button className='dropdown_menu_btn' onClick={() => setShowEditModal(true)}>
                    <FaRegEdit className='fa' />
                    <p>Edit watchlist</p>
                </button>
                {(showEditModal === true) && (
                    <Modal onClose={() => setShowEditModal(false)}>
                        <div className='delet_modal'>
                            <h3>Edit watchlist</h3>
                            <form className='edit_wl'>
                                <input

                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div>
                                    {errors?.length > 0 &&
                                    <ul className="errors">
                                        {errors.map((error, ind) => <li key={ind}>{error}</li>)}
                                    </ul>}
                                </div>
                                <div className='confirm_container'>
                                    <button onClick={handleCancel}>Cancel</button>
                                    <button className="confirm_btn" onClick={updatedWatchlist} type="submit" disabled={!name}>Update Watchlist</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}


export default EditWatchlistModal
