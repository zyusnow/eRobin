import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const AddWatchlist = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])

    const handleNewWatchlist = async (e) => {
        e.preventDefault()

        const res = await dispatch()
    }



    return (
        <div>
            <form>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <span onClick={() => setShowNewForm(false)}>Cancel</span>
                <button onClick={newWatchlist} type="submit" disabled={!name}>Create List</button>
            </form>
        </div>
    )
}

export default AddWatchlist
