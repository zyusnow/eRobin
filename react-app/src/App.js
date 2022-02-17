import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import Portfolio from './components/Portfolio';
import StockPage from './components/StockPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        {!user && (
          <Route path='/' exact={true} >
            <NavBar />
            <SplashPage/>
          </Route>
        )}
        {user && (
        <Route path='/' exact={true} >
          <NavBar />
          <Portfolio/>
        </Route>
        )}
        {user && (
        <Route path='/stocks/:ticker' exact={true} >
          <NavBar />
          <StockPage/>
        </Route>
        )}
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

      // <ProtectedRoute path='/users' exact={true} >
      //     <UsersList/>
      //   </ProtectedRoute>
      // <ProtectedRoute path='/users/:userId' exact={true} >
      //     <User />
      //   </ProtectedRoute>
