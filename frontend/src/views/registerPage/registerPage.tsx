import React, { useEffect, useState } from 'react';
import './registerPage.scss';
import SVG from 'react-inlinesvg';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/userService';
import { HttpStatusCode } from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorLabel, setErrorLabel] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!password || !username) {
      setErrorLabel('Please fill both email and password');
    } else {
      const response = await register(username, password, displayName);

      if (response.status === HttpStatusCode.Created) {
        navigate('/login');
      } else {
        setErrorLabel('Registration failed');
      }
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className='register-page'>
      <SVG
        className='clef-icon'
        src={`${process.env.PUBLIC_URL}/icons/solclef.svg`}
      />
      <div className='title'>
        Register to start <label className='blue-label'>collaborating</label>
      </div>
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
        <div className='form-section'>
          <div className='field-title'>Display Name</div>
          <input
            type='text'
            className='field-input'
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </div>
        <div className='submit-container'>
          <input type='submit' value='Register' className='submit-button' />
        </div>
        {errorLabel && <div className='error-label'>{errorLabel}</div>}
      </form>

      <a className='register-link' href='/login'>
        Already have an account?
      </a>
    </div>
  );
};

export default RegisterPage;
