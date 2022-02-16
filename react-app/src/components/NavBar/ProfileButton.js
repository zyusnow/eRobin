import { useState, useEffect } from "react";
import { useHistory, Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory()
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

    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      return history.push('/');
    };

    const toAddProduct = (e) => {
      e.preventDefault();
      if(user) {
        history.push(`/addProduct`)
      }
    }

    return (
      <>

        <div className="nav_welcome">Welcome, {user.username}</div>
        <button className='nav_right_menu' onClick={openMenu}>
          <i className="fas fa-user-circle"></i>
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>
              <Link to='/profile'>My Profile</Link>
            </li>
            <li>
              <button id="nav_logout" onClick={toAddProduct}>Sell product</button>
            </li>
            <li>
              <button id="nav_logout" onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </>
    )
  }

  export default ProfileButton;
