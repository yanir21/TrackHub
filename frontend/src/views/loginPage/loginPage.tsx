import React, { useEffect, useState } from 'react';
import './loginPage.scss';
import SVG from 'react-inlinesvg';
import { login } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../services/auth';
import { HttpStatusCode } from 'axios';
const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorLabel, setErrorLabel] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!password || !username) {
      setErrorLabel('Please fill both email and password');
    } else {
      const response = await login(username, password);
      if (response.status === HttpStatusCode.Ok) {
        const token = response.data.access_token;
        localStorage.token = token;
        const decodedToken: DecodedToken = jwt_decode(localStorage.token);
        localStorage.setItem('username', decodedToken.username);
        localStorage.setItem('displayName', decodedToken.displayName);
        window.location.href = '/explore';
      } else {
        setErrorLabel('Invalid username or password');
      }
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      localStorage.clear();
    }
  }, []);

  return (
    <div className='login-page'>
      <SVG
        className='clef-icon'
        src={`${process.env.PUBLIC_URL}/icons/solclef.svg`}
      />
      <div className='title'>Sign in to collaborate</div>
      <form onSubmit={handleSubmit}>
        <div className='form-section'>
          <div className='field-title'>Username</div>
          <input
            type='text'
            className='field-input'
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='form-section'>
          <div className='field-title'>Password</div>
          <input
            type='password'
            className='field-input'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='submit-container'>
          <input type='submit' value='Sign In' className='submit-button' />
        </div>
        {errorLabel && <div className='error-label'>{errorLabel}</div>}
      </form>

      <a className='register-link' href='/register'>
        Don't have an account yet?
      </a>
    </div>
  );
};

export default LoginPage;
