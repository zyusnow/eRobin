import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getSearchTickers } from "../../store/search"
import { Link } from 'react-router-dom'
import "./searchBar.css"

function SearchBar() {

    const allTickers = useSelector(state => state.search.tickers)
    // console.log(allTickers.slice(0,5))
    const dispatch = useDispatch()

    const [searchContent, setSearchContent] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(getSearchTickers())
    }, [dispatch])

    useEffect(() => {
        if ((searchContent === "") || !allTickers) {
            setSearchResults([])
        }
        else {
            const matchedRes = allTickers.filter(eachTicker => {
                return (eachTicker[0].includes(searchContent.toUpperCase()))
            })
            // list top 6 of matched cases
            setSearchResults(matchedRes.slice(0, 6))
        }
    }, [searchContent, allTickers])



    return (
        <div className='search_container'>
            <div className="search__bar">
                <input type="text" value={searchContent} placeholder="Search" onChange={(e) => setSearchContent(e.target.value)}></input>

            </div>
            <div id="search_results">
                {searchContent && (
                    <>
                        {searchResults.map((result) => (
                            <>
                                <Link onClick={() => setSearchContent("")} to={`/stocks/${result[0]}`}> {result[0]} - {result[1]} </Link>
                            </>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default SearchBar
