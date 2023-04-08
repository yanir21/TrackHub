import React, { CSSProperties, useMemo } from 'react';
import './userAvatar.scss';
import variables from '../../consts.scss';

const UserAvatar = ({
  displayName,
  style,
  className = ''
}: {
  displayName: String;
  className?: String;
  style?: CSSProperties;
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
      style={style}
    />
  );
};

export default UserAvatar;
