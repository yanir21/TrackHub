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
import Tags from './Tags/tags';
import http from '../../services/http';
import { Tag } from '../../models/tag';
import { useNavigate } from 'react-router-dom';
import { CREATED } from 'http-status';
import Loader from '../../components/Loader/loader';

const NewProjectPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const methods = useForm();

  const [masterTrack, setMasterTrack] = React.useState<File | null>(null);

  const [loading, setLoading] = React.useState(false);

  const { data: tags } = useGetTags();

  const handleUpload = (file: File) => {
    if (file) {
      setMasterTrack(file);
    } else {
      alert('file is not valid');
    }
  };

  const getSelectedTagsIds = () => {
    return (
      (tags as Tag[])
        .filter((tag) => methods.watch(`tags[${tag._id}].isClicked`))
        .map((tag) => tag._id) || []
    );
  };

  const uploadProject = async () => {
    try {
      if (tags) {
        const title = methods.watch('songName');
        const description = methods.watch('songDescription');
        const track = masterTrack;
        setLoading(true);

        const response = await http.post(
          '/projects',

          {
            track: track,
            title,
            description,
            tags: getSelectedTagsIds()
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.status === CREATED) {
          navigate('/profile');
        }
      }
    } finally {
      setLoading(false);
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
            <div className='button-wrapper'>
              <Button isSubmitButton={true}>Send To Collab</Button>
            </div>
            <div className='loader-container'>{loading && <Loader />}</div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default NewProjectPage;
