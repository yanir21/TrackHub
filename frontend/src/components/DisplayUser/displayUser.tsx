import React from 'react';
import UserAvatar from '../UserAvatar/userAvatar';
import './displayUser.scss';

const DisplayUser = ({
  displayName,
  onClick
}: {
  displayName: String;
  onClick?: () => void;
}) => {
  return (
    <div className='display-user-container' onClick={onClick}>
      <UserAvatar displayName={displayName} />
      <div className='display-name'>{displayName}</div>
    </div>
  );
};

export default DisplayUser;
