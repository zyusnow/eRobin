import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import "./NavBar.css"

export default function SearchBar() {

    const [searchValue,setSearchValue] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() =>{
        setSearchValue("")
    },[])

    return (
        <div className="search_container">
            <div className="search_bar">
                <input
                    type="text"
                    id="search"
                    value={searchValue}
                    placeholder="Search"
                    onChange={(e)=>setSearchValue(e.target.value)}
                />
                {/* <button className="search_button" type="submit"><i className="fas fa-search"></i></button> */}
            </div>
        </div>
    )
}
