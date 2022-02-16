import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Login.css'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login_container">
      <div className="left_container">
        <img className="left_img" src="https://res.cloudinary.com/dprnsux1z/image/upload/v1644946476/632fcb3e7ed928b2a960f3e003d10b44_b0l7r4.jpg"></img>
      </div>
      <div className="right_container">
        <div className='login_title'>Log in to eRobin</div>
        <form className="form_container" onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form_sub_container'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form_sub_container'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button id="login_button" type='submit'>Log In</button>
          </div>
        </form>
        <div className='additional'>
          <div>Not on eRobin?</div>
          <div><NavLink to = "/signup"> Create an account</NavLink></div>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
