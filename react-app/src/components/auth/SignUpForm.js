import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password));
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
        <div className="signup_title">eRobin</div>
        <div className='signup_guide'>
          <div className='signup_heading'>Make Your Money Move</div>
          <div className='signup_sub_heading'>eRobin lets you invest in companies you love, commission-free.</div>
          <div className='signup_requirement'>Please enter your full legal name. Your legal name should match any form of government ID.</div>
        </div>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='full_name'>
            <input
              type='text'
              name='firstName'
              onChange={updateFirstName}
              value={firstName}
              placeholder="First name"
              required
            ></input>
            <input
              type='text'
              name='lastName'
              onChange={updateLastName}
              value={lastName}
              placeholder="Last name"
              required
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder="Username"
              required
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder="Email"
              required
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder="Password"
              required
            ></input>
          </div>
          <div>
            <button type='submit'>Sign Up</button>
            <div>
              <div>Already started?</div>
              <NavLink to="/login">Log in to complete your application</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
