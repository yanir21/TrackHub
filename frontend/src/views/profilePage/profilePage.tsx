import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import UserAvatar from '../../components/UserAvatar/userAvatar';
import { AuthContextType } from '../../models/AuthContext';
import { RiPencilLine } from 'react-icons/ri';
import './profilePage.scss';
import useGetProjects from '../../hooks/useGetProjects';
import ExploreAudioCard from '../../components/ExploreAudioCard/exploreAudioCard';

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { data: ownedProjects } = useGetProjects();

  return (
    <div className='profile-page'>
      <div className='section-header'>Your Profile</div>
      <div className='avatar-container'>
        {currentUser && (
          <UserAvatar
            displayName={currentUser!.displayName}
            style={{ width: '90px', height: '90px' }}
          />
        )}
        <RiPencilLine
          className='name-edit-icon'
          style={{ width: '30px', height: '30px' }}
        />
      </div>
      {currentUser && (
        <div className='user-display-name'>
          {currentUser.displayName}
          <RiPencilLine className='name-edit-icon' />
        </div>
      )}

      <div className='section-header'>Songs</div>
      {ownedProjects.map((project) => (
        <ExploreAudioCard
          project={project}
          showAuthor={false}
          key={project._id}
        />
      ))}
      <div className='section-header'>Contributed On</div>
      {ownedProjects.map((project) => (
        <ExploreAudioCard
          project={project}
          showAuthor={false}
          key={project._id}
        />
      ))}
    </div>
  );
};

export default ProfilePage;
