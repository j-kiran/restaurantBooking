import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {setAlert} from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const {name, email, password, password2} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = e => {
       e.preventDefault();
       if(password !== password2) {
           setAlert('password not match', 'danger')
       }else {
          register({ name, email, password })
        }
   } 

   if(isAuthenticated){
     return <Redirect to='/' />
   }
  return (
    <Fragment>
      
      <section className='signup'>
        <h1 className='large text-dark log1'>Sign Up</h1>
        {/* <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p> */}
        <form className='form log' onSubmit={e => onSubmit(e) }>
          <div className='form-group'>
            <input className='form-control'
            type='text' 
            placeholder='Name' 
            name='name'
            value = {name}
            onChange={e => onChange(e)}
            
             />
          </div>
          <div className='form-group'>
            <input className='form-control'
            type='email' 
            placeholder='Email Address' 
            name='email'
            value = {email}
            onChange={e => onChange(e)}
             />
          </div>
          <div className='form-group'>
            <input className='form-control'
              type='password'
              placeholder='Password'
              name='password'
              value = {password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input className='form-control'
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value = {password2}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-dark form-control' value='Register' />
        </form>
        <p className='my-1 text-dark' >
          Already have an account? <Link to='/login' className='mr-2 text-primary'>LogIn</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);