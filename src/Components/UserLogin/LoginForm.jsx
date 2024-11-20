import { useState } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
// import { Auth } from 'aws-amplify'

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  return (
    <div className="login-form">
      <div className="login-logo">
        <img src={`${process.env.PUBLIC_URL}/LeftBarTopComponent.svg`} alt="Logo" className="logo-image" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Login" 
          className="input-field"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
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
