import React from 'react';
import DisplayUser from '../DisplayUser/displayUser';
import './navbar.scss';
import { getDisplayName, getToken, getUsername } from '../../services/auth';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        {getToken() && <DisplayUser displayName={getDisplayName()} />}
      </div>
      <span className='navbar-center site-name'>TrackHub</span>
    </div>
  );
};

export default Navbar;
