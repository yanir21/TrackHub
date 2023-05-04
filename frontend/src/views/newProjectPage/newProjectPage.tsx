import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import UserAvatar from '../../components/UserAvatar/userAvatar';
import { AuthContextType } from '../../models/AuthContext';
import { RiPencilLine } from 'react-icons/ri';
import './newProjectPage.scss';
import useGetProjects from '../../hooks/useGetProjects';
import ExploreAudioCard from '../../components/ExploreAudioCard/exploreAudioCard';
import useGetTags from '../../hooks/useGetTags';
import NewProjectTag from '../../components/newProjectTag/newProjectTag';
import Button from '../../components/Button/button';
import UploadAudioButton from './UploadAudioButton/uploadAudioButton';

const NewProjectPage = () => {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { data: ownedProjects } = useGetProjects();
  const { data: tags, error: tagsError, loading: tagsLoading } = useGetTags();

  if (tagsError) {
    return <div> error :( </div>;
  }

  if (tagsLoading) {
    return <div> loading... </div>;
  }

  debugger;
  return (
    <div className='new-project-page'>
      <div className='new-song'>New Song</div>
      <div className='page-content'>
        <div className='upload-title'>Upload Your Sketch </div>
        <div className='upload-audio'>
          <UploadAudioButton />
        </div>
        <div className='first-sub-title'>
          We know it may be hard to define, but
        </div>
        <div className='second-sub-title'>how would you describe it?</div>
        <div className='tags-container'>
          <div className='tags-wrapper'>
            <div className='tags'>
              {tags?.map((tag) => {
                return (
                  <div className='tag'>
                    <NewProjectTag tag={tag} key={tag._id} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            alert('clicked!');
          }}
        >
          Send To Collab
        </Button>
      </div>
    </div>
  );
};

export default NewProjectPage;
