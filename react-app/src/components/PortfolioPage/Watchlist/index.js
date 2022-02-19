import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getUserInfo } from "../../../store/session";
import { FaPlus} from 'react-icons/fa';
import '../PortfolioPage.css'
import AddWatchlist from "../AddWatchlist";

const Watchlist = () => {

    const [renderPage, setRenderPage] = useState(true);
    const [openNewForm, setOpenNewForm] = useState(false);

    const addWatchlist = (e) => {
        setOpenNewForm(true)
        console.log("jere", openNewForm)
    }



    return (
        <div className="portfolio_right">
            <div className="portfolio_right_sub">
                <div className="portf_header">
                    Watchlist
                    <FaPlus className='add_btn' onClick={addWatchlist}/>
                </div>
                <div>
                    {openNewForm === true && (
                        <AddWatchlist setOpenNewForm={setOpenNewForm}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Watchlist
