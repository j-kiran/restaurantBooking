/** @format */

import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateBookings} from '../../actions/bookingActions';
import {Link,withRouter} from 'react-router-dom';
import { setCurrent} from '../../actions/bookingActions';
import moment from 'moment';

const EditBooking = ({current, updateBookings, history}) => {
  const [name, setName] = useState('');
  const [email, setEmail] =  useState('')
  const [phone, setPhone] =  useState('')
  const [date, setDate] =  useState('')
 

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if(current !== null ) {
      setName(current.name);
      setEmail(current.email)
      setPhone(current.phone)
      setDate(current.date)
    }
  }, [current]);

   const onSubmit = (e) => {
    e.preventDefault();
  history.push('/')

  setEditing(true)
   console.log(name, email, phone, date)
    const uptBooking = {
      id: current._id,
      name,
      email,
      phone,
      date
  }
    updateBookings(uptBooking);
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
  };

  return (
    <Fragment>
      <div className="edit">
      <h1 className='large text-dark log1'>Edit Your Bookings</h1>
      {/* <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to Create
        Your Contact
      </p> */}
      <form onSubmit={(e) => onSubmit(e)} className='log'>
        <div className='form-group'>
          {/* <label htmlFor='name'>Name</label> */}
          <input
            className='form-control'
            id='name'
            type='text'
            placeholder='name'
            name='name'
            value={name}
            onChange={e => setName(e.target.value)}      
                />
        </div>
        <div className='form-group'>
          {/* <label htmlFor='email'>Email</label> */}
          <input
            id='email'
            className='form-control'
            type='email'
            placeholder='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}          
            />
        </div>
        <div className='form-group'>
          {/* <label htmlFor='phone'>phone</label> */}

          <input
            id='phone'
            className='form-control'
            type='text'
            placeholder='phone'
            name='phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}          
          />
        </div>
        <div className='form-group'>
          {/* <label htmlFor='date'>date</label> */}

          <input
            id='date'
            className='form-control'
            type='text'
            placeholder='date'
            name='date'
            value={moment(date).format('LLL')}
            onChange={e => setDate(e.target.value)}          
          />
        </div>
        <button type='submit' className='form-control btn btn-dark'>
          Update
        </button>
        <p>
        <Link to='/bookings' className='text-primary'>
          Go Back
        </Link>
        </p>
    
      </form>
      </div>

    </Fragment>

  );
};
EditBooking.propTypes = {
  current: PropTypes.object,
  updateBookings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.booking.current
});

export default connect(mapStateToProps, { updateBookings})(withRouter(EditBooking));
