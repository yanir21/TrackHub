import React from 'react';
import SVG from 'react-inlinesvg';
import './uploadAudioButton.scss';

export default function UploadAudioButton() {
  return (
    <SVG
      onClick={() => {
        alert('add audio');
      }}
      className='upload-audio-svg'
      src={`${process.env.PUBLIC_URL}/icons/uploadAudio.svg`}
    />
  );
}
