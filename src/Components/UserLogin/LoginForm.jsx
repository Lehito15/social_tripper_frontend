import React from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <div className="login-form">
      <div className="login-logo">
        <img src={`${process.env.PUBLIC_URL}/LeftBarTopComponent.svg`} alt="Logo" className="logo-image" />
      </div>
      <form className="form">
        <input 
          type="text" 
          placeholder="Login" 
          className="input-field"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field"
        />
        <button type="submit" className="login-button">
          Log In
        </button>
        <button className="google-button">
          Sign in with Google
        </button>
        <div className='login-link'> 
          <Link >
            Forgot Password?
          </Link>
          <Link >
            Don't have account? <br></br>
            Sign Up
          </Link>
        </div>

        </form>
    </div>
  );
}

export default LoginForm;
