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

  const onChange = (e) =>
    setBooking({ ...Booking, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addBookings(Booking, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">create Contacts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to Create
        Your Contact
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group"></div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="phone"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="datetime-local"
            placeholder="date"
            name="date"
            value={date}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          onClick={toggle}
          className="btn btn-primary my-1"
        />
        <Link to="/" className="btn btn-light my-1">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddBooking.propTypes = {
  addBookings: PropTypes.func.isRequired,
};

export default connect(null, { addBookings })(AddBooking);
