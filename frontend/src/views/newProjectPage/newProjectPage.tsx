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

const NewProjectPage = () => {
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const { data: ownedProjects } = useGetProjects();

  const methods = useForm();

  const [songName, setSongName] = React.useState<string>('');
  const [masterTrack, setMasterTrack] = React.useState<File | null>(null);
  const [songDescription, setSongDescription] = React.useState<string>('');

  const handleUpload = (file: File) => {
    if (file) {
      setMasterTrack(file);
    } else {
      alert('file is not valid');
    }
  };

  const uploadPost = () => {
    const masterSong = masterTrack;
    const songName = methods.watch('songName');
    const songDescription = methods.watch('songDescription');
    console.log(masterSong, songName, songDescription);
  };

  const onSubmit = (data: any) => uploadPost();

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
                  <NewAudioCard
                    masterTrack={masterTrack}
                    songNameChanged={setSongName}
                    songDescriptionChanged={setSongDescription}
                  />
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
            <Button
              isSubmitButton={true}
              // onClick={() => {
              //   alert(
              //     'song name: ' +
              //       songName +
              //       ' song description: ' +
              //       songDescription +
              //       ' tags: ' +
              //       selectedTags +
              //       ' master track: ' +
              //       masterTrack?.name
              //   );
              // }}
            >
              Send To Collab
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default NewProjectPage;
