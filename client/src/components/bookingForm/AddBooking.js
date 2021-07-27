/** @format */

import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBookings } from "../../actions/bookingActions";

const AddBooking = ({ addBookings, history, toggle }) => {
  const [Booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
  });

  const { name, email, phone, date } = Booking;

  document.oncontextmenu = new Function('return false')
  document.body.oncut = new Function('return false');
  document.body.oncopy = new Function('return false');
  document.body.onpaste = new Function('return false');
  document.body.onselectstart=new Function("return false")

  const onChange = (e) =>
    setBooking({ ...Booking, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addBookings(Booking, history);
  };
  const handleCopy = (e) => {
    console.log('Hello world');
    e.preventDefault();
    e.stopPropagation();
  }
  return (
    <Fragment>
      <div className="add-form ">
        <h1 className="large text-dark">Book Table</h1>
        <form className="form " onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onCopy={(e) => handleCopy(e)}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="datetime-local"
              placeholder="Date"
              name="date"
              value={date}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input
            type="submit"
            onClick={toggle}
            className="form-control btn btn-dark my-1"
          />
        </form>
      </div>
    </Fragment>
  );
};

AddBooking.propTypes = {
  addBookings: PropTypes.func.isRequired,
};

export default connect(null, { addBookings })(AddBooking);
