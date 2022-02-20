import { FaRegEdit, FaTrashAlt, FaEllipsisH } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import DeleteWatchlistModal from '../../Modals/DeleteWatchlistModal';


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
                        <button >
                            <FaRegEdit className='edit_watchlist_btn' />
                            Edit watchlist
                        </button>
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
