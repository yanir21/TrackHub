import React, { useEffect, useMemo } from 'react';
import './userAvatar.scss';
import variables from '../../consts.scss';

const UserAvatar = ({
  displayName,
  className = ''
}: {
  displayName: String;
  className?: String;
}) => {
  const nameParam = useMemo(() => {
    const [firstName, secondName] = displayName.split(' ');
    return !secondName ? firstName : `${firstName}+${secondName}`;
  }, [displayName]);

  return (
    <img
      className={`user-avatar ${className}`}
      src={`https://ui-avatars.com/api/?name=${nameParam}&background=${
        variables.primaryColor.split('#')[1]
      }&color=fff`}
    />
  );
};

export default UserAvatar;
