import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editWatchlistById } from '../../store/watchlist'


export default function EditWatchlistModal({ watchlistId, setShowEditModal }) {
    const dispatch = useDispatch()

    const watchlist = useSelector(state => state.watchlist?.watchlists[+watchlistId])

    const [name, setName] = useState(watchlist?.name)
    const [errors, setErrors] = useState([])

    const editWatchlist = async (e) => {
        e.preventDefault()

        const payload = {
            watchlistId,
            name
        }

        const data = await dispatch(editWatchlistById(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setShowEditModal(false)
        }

    }

    return (
        <>
            <div className="watchlist-form">
                <i className="fa-solid fa-xmark" onClick={() => setShowEditModal(false)}></i>
                <h3 className="watchlist-title">Edit list</h3>
                <div>
                    {errors?.length > 0 && <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>}
                </div>
                <form>
                    <div className="watchlist-input-container">
                        <input
                        autoComplete="off"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={editWatchlist} type="submit" disabled={!name}>Save</button>
                    </div>
                </form>
            </div>
         </>
    )
}
