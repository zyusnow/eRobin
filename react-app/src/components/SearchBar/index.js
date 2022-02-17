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
    const [matchedStocks, setMatchedStocks] = useState([]);

    useEffect(() => {
        dispatch(getSearchTickers())
    }, [dispatch])

    useEffect(() => {
        if ((searchContent === "") || !allTickers) {
            setMatchedStocks([])
        }
        else {
            const matchedRes = allTickers.filter(eachTicker => {
                return (eachTicker[0].includes(searchContent.toUpperCase())) || (eachTicker[1].toUpperCase().includes(searchContent.toUpperCase()))
            })
            // list top 6 of matched cases
            setMatchedStocks(matchedRes.slice(0, 6))
        }
    }, [searchContent, allTickers])



    return (
        <div id='search_container'>
            <div className="search_input">
                <input
                    type="text"
                    name="searchContent"
                    value={searchContent}
                    placeholder="Search"
                    onChange={(e) => setSearchContent(e.target.value)}>
                </input>
            </div>
            <div>
                {searchContent && (
                    <div id="search_list">
                        {matchedStocks.map((stock) => (
                            <div key={stock[0]} className='search_item'>
                                <Link className="search_info" onClick={() => setSearchContent("")} to={`/stocks/${stock[0]}`}>


                                    <div className='stock_ticker ticker_name'>
                                        {stock[0]}
                                    </div>
                                    <div className='stock_ticker ticker_company'>
                                        {stock[1]}
                                    </div>

                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar
