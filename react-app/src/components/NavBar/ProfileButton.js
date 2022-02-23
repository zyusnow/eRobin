import { useState, useEffect } from "react";
import { useHistory, Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './NavBar.css'

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

    return (
      <div className="nav_right">
        <Link className="nav_link" to='/'>Portfolio</Link>
        <Link className="nav_link" to='/transactions'>Transactions</Link>
        <button className='nav_right_menu' onClick={openMenu}>
          <i className="fas fa-user-circle"></i>
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
              <li>
                  {user.first_name} {user.last_name}
              </li>
            <li>
              <button id="nav_logout" onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    )
  }

  export default ProfileButton;
