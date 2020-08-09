/** @format */

import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/auth';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
  const authLinks = (
    <ul className='nav justify-content-end'>
      <li className='nav-item'>
        <Link to='/' className='nav-link active'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/bookings' className='nav-link active'>
          Bookings
        </Link>
      </li>

      <li className='nav-item navcol'>
        <a onClick={logout} href='#!'className='nav-link active'>
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='nav justify-content-end'>

      <li className='nav-item'>
        <Link to='/register' className='nav-link active'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link active'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark navbar-custom'>
      <h1>
        <Link to='/' className='nav-link active'>
          Food beat
        </Link>
      </h1>
      {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Navbar);