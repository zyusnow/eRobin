
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar';
import ProfileButton from './ProfileButton';
import FindMe from './FindMe';
import { FaCrow, FaGithub, FaLinkedin} from 'react-icons/fa';
import './NavBar.css'


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav id="navbar">
      {
        !sessionUser && (
          <div className='navbar_container'>
            <div className='navbar_left'>
              <NavLink id="nav_head" to='/' exact={true}>
                eRobin
              </NavLink>
            </div>
            <div className='navbar_right'>
              <div>
                <NavLink className="nav_auth" to='/login' exact={true}>
                  Login
                </NavLink>
              </div>
              <div className=''>
                <NavLink id="nav_signup" className="nav_auth" to='/signup' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
      )}
      {
        sessionUser && (
          <div className='auth_narbar'>
            <NavLink to="/" >
              <FaCrow className='bird_logo'/>
            </NavLink>
            <SearchBar />
            <FindMe />
            <ProfileButton user={sessionUser}/>
          </div>
        )
      }
    </nav>

    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
