import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import { AuthContextType } from '../../models/AuthContext';
import DisplayUser from '../DisplayUser/displayUser';
import { GrLogout } from 'react-icons/gr';
import './navbar.scss';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <span className='firstLogoWord'>Track</span>
        <span className='secondLogoWord'>Hub</span>
      </div>
      <span className='navbar-center site-name'></span>
      {currentUser && (
        <div className='navbar-right'>
          <div className='logout-container' onClick={logout}>
            <GrLogout className='logout-icon' stroke='white' />
            <span className='logout-label'>Logout</span>
          </div>
          {currentUser && (
            <DisplayUser
              displayName={currentUser.displayName}
              onClick={() => navigate('/profile')}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
