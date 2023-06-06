import React, { useContext, useEffect, useState } from 'react';
import './loginPage.scss';
import SVG from 'react-inlinesvg';
import { serverLogin } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import { setToken } from '../../services/auth';
import { AuthContext } from '../../App';
import { AuthContextType } from '../../models/AuthContext';
const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorLabel, setErrorLabel] = useState<string>('');
  const { login } = useContext(AuthContext) as AuthContextType;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!password || !username) {
      setErrorLabel('Please fill both email and password');
    } else {
      try {
        const response = await serverLogin(username, password);
        const token = response.data.access_token;
        setToken(token);
        login(token, true);
      } catch {
        setErrorLabel('Incorrect username or password');
      }
    }
  };

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
