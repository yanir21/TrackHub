import React, { useState } from 'react';
import UploadAudioButton from '../../newProjectPage/UploadAudioButton/uploadAudioButton';
import './modalContent.scss';
interface ModalContentProps {
  closeModal: () => void;
}
const ModalContent = ({ closeModal }: ModalContentProps) => {
  const [trackDescription, setTrackDescription] = useState<string>('');
  const [file, setFile] = useState<File>();
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
      <div className='footer'>
        <label className='close-button' onClick={closeModal}>
          Cancel
        </label>
        {file?.name && (
          <label className='submit-button' onClick={closeModal}>
            Submit
          </label>
        )}
      </div>
    </div>
  );
};

export default ModalContent;
