import React from 'react';
import { sidenavItemData } from './consts';
import './sidenav.scss';
import SidenavItem from './SidenavItem/sidenavItem';

const Sidenav = () => {
  return (
    <span className='sidenav'>
      {sidenavItemData.map((item) => (
        <SidenavItem key={item.label} {...item} />
      ))}
    </span>
  );
};

export default Sidenav;
