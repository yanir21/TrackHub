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
import NewAudioCard from '../../components/newAudioCard/newAudioCard';
import { FormProvider, useForm } from 'react-hook-form';
import { log } from 'console';
import Tags from './Tags/tags';
import http from '../../services/http';

const NewProjectPage = () => {
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const methods = useForm();

  const [masterTrack, setMasterTrack] = React.useState<File | null>(null);

  const { data: tags } = useGetTags();

  const handleUpload = (file: File) => {
    if (file) {
      setMasterTrack(file);
    } else {
      alert('file is not valid');
    }
  };

  const getSelectedTags = () => {
    return (
      tags?.filter((tag) => methods.watch(`tags[${tag._id}].isClicked`)) || []
    );
  };

  const uploadProject = () => {
    if (tags) {
      const masterSong = masterTrack;
      const title = methods.watch('songName');
      const description = methods.watch('songDescription');
      console.log(getSelectedTags(), masterSong, title, description);
      http.post('/projects', {
        masterSong,
        title,
        description,
        tags: getSelectedTags()
      });
    }
  };

  const onSubmit = (data: any) => {
    uploadProject();
  };

  return (
    <div className='new-project-page'>
      <div className='new-song'>New Song</div>
      <div className='page-content'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='upload-title'>Upload Your Sketch </div>

            {!masterTrack ? (
              <div className='upload-audio'>
                <UploadAudioButton onUpload={handleUpload} />
              </div>
            ) : (
              <div className='new-audio-card-wrapper'>
                <div className='new-audio-card'>
                  <NewAudioCard masterTrack={masterTrack} />
                </div>
              </div>
            )}
            <div className='first-sub-title'>
              We know it may be hard to define, but
            </div>
            <div className='second-sub-title'>how would you describe it?</div>
            <div className='tags-wrapper'>
              <Tags />
            </div>
            <Button isSubmitButton={true}>Send To Collab</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default NewProjectPage;
