import React, { useState } from 'react';
import UploadAudioButton from '../../newProjectPage/UploadAudioButton/uploadAudioButton';
import './modalContent.scss';
import http from '../../../services/http';
import { CREATED } from 'http-status';
interface ModalContentProps {
  closeModal: () => void;
  projectId: string;
  reloadProject: () => void;
}
const ModalContent = ({
  closeModal,
  projectId,
  reloadProject
}: ModalContentProps) => {
  const [trackDescription, setTrackDescription] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>();

  const submitTrack = async () => {
    setLoading(true);
    try {
      const response = await http.post(
        '/suggestions',

        {
          track: file,
          description: trackDescription,
          projectId
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === CREATED) {
        closeModal();
        reloadProject();
      } else {
        throw new Error();
      }
    } catch (err) {
      setErrorText("Something didn't work, try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='modal-content'>
      <div className='modal-title'>Upload A suggestion</div>
      <div className='mid-section'>
        <UploadAudioButton onUpload={setFile} />
        <div>{file?.name}</div>
      </div>
      {file?.name && (
        <>
          <label className='description-title'>Description (Optional)</label>
          <textarea
            className='description-input'
            value={trackDescription}
            onChange={(e) => setTrackDescription(e.target.value)}
          />
        </>
      )}
      {!!errorText && <div className='error-text'>{errorText}</div>}
      <div className='footer'>
        <label className='close-button' onClick={closeModal}>
          Cancel
        </label>
        {file?.name && (
          <label className='submit-button' onClick={submitTrack}>
            Submit
          </label>
        )}
      </div>
    </div>
  );
};

export default ModalContent;
