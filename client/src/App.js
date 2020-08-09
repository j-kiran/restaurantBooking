/** @format */

import React, { useEffect, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import AddBooking from './components/bookingForm/AddBooking';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './util/setAuthToken';
import Navbar from './components/Navbar';
import EditBooking from './components/bookingForm/EditBooking'
import BookingList from './components/BookingList'
import PrivateRoute from './components/Routing/PrivatesRoute';
import Home from './components/Home'
import  { loadUser } from './actions/auth'
import { createHashHistory } from 'history'
import Alert from './components/Alert'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Fragment>
        <Router >
          <Navbar />
          <Alert />

          <Switch>
            <PrivateRoute exact path='/'>
              <Home />
            </PrivateRoute>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <PrivateRoute exact path='/bookings'>
              <BookingList />
            </PrivateRoute>
            <PrivateRoute exact path='/edit'>
              <EditBooking />
            </PrivateRoute>
          </Switch>
            </Router>
      </Fragment>
    </Provider>
  );
}

export default App;