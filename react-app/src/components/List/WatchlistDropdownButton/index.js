import { FaRegEdit, FaTrashAlt, FaEllipsisH } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import DeleteWatchlistModal from '../../Modals/DeleteWatchlistModal';
import EditWatchlistModal from '../../Modals/EditWatchlistModal';


const WatchlistDropdownButton = ({ watchlistId, renderPage, setRenderPage }) => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        setShowMenu(!showMenu);
    };


    return (
        <div>
            <button className="wl_dropdown_btn" onClick={openMenu}>
                <FaEllipsisH className="fa dropdown_btn" />
            </button>
                {showMenu && (
            <div >
                    <div className="wl_dropdown_menu">
                            <EditWatchlistModal watchlistId={watchlistId} renderPage={renderPage} setRenderPage={setRenderPage} setShowMenu={setShowMenu} />
                            <DeleteWatchlistModal watchlistId={watchlistId} renderPage={renderPage} setRenderPage={setRenderPage} setShowMenu={setShowMenu} />
                    </div>
            </div >
                )}
        </div>
    )
}

export default WatchlistDropdownButton
