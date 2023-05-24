import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import { AuthContextType } from '../../models/AuthContext';
import DisplayUser from '../DisplayUser/displayUser';
import { GrLogout } from 'react-icons/gr';
import './navbar.scss';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext) as AuthContextType;

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        {currentUser && <DisplayUser displayName={currentUser.displayName} />}
      </div>
      <span className='navbar-center site-name'>TrackHub</span>
      {currentUser && (
        <div className='navbar-right'>
          <GrLogout className='logout-icon' stroke='white' />
          <span className='logout-label' onClick={logout}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
