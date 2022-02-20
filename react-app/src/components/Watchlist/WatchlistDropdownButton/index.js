import { FaRegEdit, FaTrashAlt, FaEllipsisH } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import DeleteWatchlistModal from '../../Modals/DeleteWatchlistModal';
import EditWatchlistModal from '../../Modals/EditWatchlistModal';


const WatchlistDropdownButton = (watchlistId) => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    return (
        <div>
            <button onClick={openMenu}>
                <FaEllipsisH/>
            </button>
            {showMenu && (
                <ul>
                    <li>
                        <EditWatchlistModal watchlistId = {watchlistId} />
                    </li>
                    <li>
                        <DeleteWatchlistModal watchlistId = {watchlistId}/>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default WatchlistDropdownButton
