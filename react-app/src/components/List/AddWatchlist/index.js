import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addWatchlist } from "../../../store/watchlist"

const AddWatchlist = ({setOpenNewForm, setRenderPage, renderPage}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])

    const handleNewWatchlist = async (e) => {
        e.preventDefault()
        const res = await dispatch(addWatchlist({name, userId}))
        if (res.errors) {
            setErrors(res.errors)
        } else {
            setOpenNewForm(false)
            setRenderPage(!renderPage)
        }
    }

    return (
        <div className="wl_create_container">
             <form className="wl_create_form">
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <div >
                    <button className={(name) ? 'valid_wl_name' : 'unvalid_wl_name'} onClick={handleNewWatchlist} type="submit" disabled={!name}>Create Watchlist</button>
                    <button className="wl_create_btn" onClick={() => setOpenNewForm(false)}>Cancel</button>
                </div>
            </form>
            <div>
                {errors?.length > 0 && <ul className="errors">
                {errors.map((error, ind) => <li key={ind}>{error}</li>)}
                </ul>}
            </div>

        </div>
    )
}

export default AddWatchlist
