/** @format */

import React, { useEffect, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Addmodal from './components/AddModal';
import AddBooking from './components/bookingForm/AddBooking';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './util/setAuthToken';
import Navbar from './components/Navbar';
import EditBooking from './components/bookingForm/EditBooking'
import PrivateRoute from './components/Routing/PrivatesRoute';
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
          <section className="container">
            <Alert />
          <Switch>
            <PrivateRoute exact path='/'>
              <Addmodal />
            </PrivateRoute>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <PrivateRoute exact path='/edit'>
              <EditBooking />
            </PrivateRoute>
          </Switch>
          </section>
            </Router>
      </Fragment>
    </Provider>
  );
}

export default App;