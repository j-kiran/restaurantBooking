/** @format */

import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import {getBookings, deleteBooking, setCurrent} from '../actions/bookingActions';

const BookingList = ({ getBookings, deleteBooking, setCurrent, booking: {bookings}}) => {


  useEffect(() => {
    getBookings();
  }, [getBookings]);



  return (
    <Fragment>
    <div className="data mt-4">
      <table className='table table-striped'>
        <tbody>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Date</th>
            <th scope='col'>Action</th>
          </tr>
        </tbody>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <tbody key={booking._id}>
              <tr>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{moment(booking.date).format('LLL')}</td>
                <button type="button" className="btn btn-primary mr-3 mt-2" onClick={() =>  deleteBooking(booking._id)}>Delete</button>
                <Link to='/edit'  onClick={ () =>  setCurrent(booking)} className="btn btn-primary mt-2">Edit</Link>
                            
              </tr>
            </tbody>
          ))
        ) : (
          <h4>No Bookings found</h4>
        )}
      </table>
    </div>
    </Fragment>
      );
     
};
BookingList.propTypes = {
  getBookings: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  deleteBooking: PropTypes.func.isRequired,
  setCurrent:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  booking: state.booking,
});

export default connect(mapStateToProps, {getBookings,setCurrent, deleteBooking})(BookingList);
