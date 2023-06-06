import classNames from 'classnames';
import React, { useMemo } from 'react';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import './sidenavItem.scss';
export interface SidenavItemProps {
  path: string;
  label: string;
  icon: IconType;
}
const SidenavItem = (props: SidenavItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isChosen = useMemo(() => location.pathname == props.path, [location]);

  return (
    <div
      onClick={() => navigate(props.path)}
      className={classNames('sidenav-item', { chosen: isChosen })}
    >
      <props.icon className='sidenav-icon' />
      {props.label}
    </div>
  );
};

export default SidenavItem;
