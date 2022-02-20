import { FaRegEdit, FaTrashAlt, FaEllipsisH } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import DeleteWatchlistModal from '../../Modals/DeleteWatchlistModal';
import EditWatchlistModal from '../../Modals/EditWatchlistModal';


const WatchlistDropdownButton = ({watchlistId, renderPage, setRenderPage}) => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            <button onClick={openMenu}>
                <FaEllipsisH/>
            </button>
            {showMenu && (
                <ul>
                    <li>
                        <EditWatchlistModal watchlistId = {watchlistId} renderPage={renderPage} setRenderPage={setRenderPage} setShowMenu={setShowMenu}/>
                    </li>
                    <li>
                        <DeleteWatchlistModal watchlistId={watchlistId} renderPage={renderPage} setRenderPage={setRenderPage} setShowMenu={setShowMenu}/>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default WatchlistDropdownButton
