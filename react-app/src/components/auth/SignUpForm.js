import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, first_name, last_name));
    if (data) {
      setErrors(data)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup_container">
      <div className='signup_left'>
        <div className='signup_left_sub'>
          <div className="signup_title">eRobin</div>
          <div className='signup_guide'>
            <div className='signup_heading'>Make Your Money Move</div>
            <div className='signup_sub_heading'>eRobin lets you invest in companies you love, commission-free.</div>
            <div className='signup_requirement'>Please enter your full legal name. Your legal name should match any form of government ID.</div>
          </div>
          <form id="sign_up_form" onSubmit={onSignUp}>
            <div className='error_container'>
              {errors.map((error, ind) => (
                <div className= "error_msg" key={ind}>{error}</div>
              ))}
            </div>
            <div className='full_name'>
              <input
                type='text'
                name='first_name'
                onChange={updateFirstName}
                value={first_name}
                placeholder="First name"
                required
              ></input>
              <input
                type='text'
                name='last_name'
                onChange={updateLastName}
                value={last_name}
                placeholder="Last name"
                required
              ></input>
            </div>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                placeholder="Username"
                required
              ></input>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder="Email"
                required
              ></input>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder="Password"
                required
              ></input>
            <div className='signup_btn_container'>
              <button className="signup_btn" type='submit'>Sign Up</button>
              <div className='to_login'>
                <div>Already started?</div>
                <NavLink to="/login">Log in to complete your application</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='signup_right'>
        <div className='signup_right_sub'>
          <div className="signup_right_info">
            <div className="signup_right_title">Commission-free trading</div>
            <div className="signup_right_content">Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. Other fees may apply. View our fee schedule to learn more.</div>
          </div>
          <div className="signup_right_info">
            <div className="signup_right_title">Account Protection</div>
            <div className="signup_right_content">eRobin is a member of SIPC. Securities in your account protected up to $500,000. For details, please see www.sipc.org.</div>
          </div>
          <div className="signup_right_info">
            <div className="signup_right_title">Stay on top of your portfolio</div>
            <div className="signup_right_content">Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
