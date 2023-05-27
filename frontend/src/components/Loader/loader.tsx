import React from 'react';
import './loader.scss';

export default function Loader() {
  return (
    <div className='loader-component-container'>
      <div className='animation'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
