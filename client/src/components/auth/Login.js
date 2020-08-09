import React, {useState, Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import {  login } from '../../actions/auth'
import PropTypes from 'prop-types'

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const { email, password} = formData;
    
      const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
       const onSubmit = e => {
           e.preventDefault();
            login( email, password)
          } 
        // Redirect if logged in
        if(isAuthenticated) {
          return <Redirect to="/" />
        }
    
      return (
        <Fragment>
          <div className="container ">
          <section className='login'>
            <h1 className='large text-dark log1'>Login</h1>
            <form className='form log' onSubmit={e => onSubmit(e) }>

              <div className='form-group'>
                <input  className='form-control'
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
                  minLength='6'
                  value = {password}
                  onChange={e => onChange(e)}
                />
              </div>
              <input type='submit' className='btn btn-dark mb-4 form-control' value='Login' />
  
            </form>
            <p className='my-1 text-dark'>
              Don't have an account? <Link to='/register' className='mr-2 text-primary'>Sign Up</Link>
            </p>
          </section>
          </div>
        </Fragment>
      );
    };

Login.propTypes = {

  login : PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login})(Login);
    