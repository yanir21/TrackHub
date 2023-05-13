import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { FileUploader } from 'react-drag-drop-files';
import './uploadAudioButton.scss';

interface UploadAudioButtonProps {
  onUpload: (file: File) => void;
}

export default function UploadAudioButton({
  onUpload
}: UploadAudioButtonProps) {
  const FILE_TYPES = ['mp3', 'wav'];
  const handleChange = (file: any) => {
    onUpload(file);
  };

  return (
    <FileUploader
      dropMessageStyle={{ display: 'none', cursor: 'pointer' }}
      handleChange={handleChange}
      name='file'
      types={FILE_TYPES}
    >
      <SVG
        className='upload-audio-svg'
        src={`${process.env.PUBLIC_URL}/icons/uploadAudio.svg`}
      ></SVG>
    </FileUploader>
  );
}
