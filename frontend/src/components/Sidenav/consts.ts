import { SidenavItemProps } from './SidenavItem/sidenavItem';
import { MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

export const sidenavItemData: SidenavItemProps[] = [
  { label: 'Explore', path: '/explore', icon: MdOutlineExplore },
  { label: 'Profile', path: '/profile', icon: CgProfile }
];
