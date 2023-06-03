import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import UserAvatar from '../../components/UserAvatar/userAvatar';
import { AuthContextType } from '../../models/AuthContext';
import { RiPencilLine } from 'react-icons/ri';
import './profilePage.scss';
import useGetProjects from '../../hooks/useGetProjects';
import ExploreAudioCard from '../../components/ExploreAudioCard/exploreAudioCard';
import useGetUserProjects from '../../hooks/useGetUserProjects';
import Button from '../../components/Button/button';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const {
    data: ownedProjects,
    loading: ownedLoading,
    error: ownedError
  } = useGetUserProjects({ userId: currentUser?.id || '' });

  const {
    data: contributedProjects,
    loading: contributedLoading,
    error: contributedError
  } = useGetProjects();

  if (ownedError || contributedError) return <div>Error</div>;
  if (ownedLoading || contributedLoading) return <div>Loading...</div>;

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
      </div>
      {currentUser && (
        <div className='user-display-name'>{currentUser.displayName}</div>
      )}

      <div className='section-header'>Songs</div>

      {!ownedProjects.length ? (
        <div className='no-songs-message'>
          <Button onClick={() => navigate('/newProject')}>
            Upload Your First Artwork!
          </Button>
        </div>
      ) : (
        ownedProjects.map((project) => (
          <ExploreAudioCard
            project={project}
            showAuthor={false}
            key={project._id}
          />
        ))
      )}
      <div className='section-header'>Contributed On</div>
      {!contributedProjects.length ? (
        <div className='no-songs-message'>
          <Button onClick={() => navigate('/newProject')}>
            Support Music Community!
          </Button>
        </div>
      ) : (
        contributedProjects.map((project) => (
          <ExploreAudioCard
            project={project}
            showAuthor={false}
            key={project._id}
          />
        ))
      )}
    </div>
  );
};

export default ProfilePage;
