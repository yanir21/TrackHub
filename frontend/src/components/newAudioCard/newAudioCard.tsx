import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import classNames from 'classnames';
import './newAudioCard.scss';
import SongNameInput from './components/songNameInput/songNameInput';
import SongDescriptionInput from './components/songDescriptionInput/songDescriptionInput';
interface NewAudioCardProps {
  masterTrack: File;
}
const NewAudioCard = React.memo(({ masterTrack }: NewAudioCardProps) => {
  const SongName = () => (
    <div className='song-name'>
      <SongNameInput />
    </div>
  );

  const SongDescription = () => (
    <div className='song-description'>
      <SongDescriptionInput />
    </div>
  );

  const AudioFile = () => {
    return (
      <div className='audio-file-container'>
        <AudioPlayer
          src={URL.createObjectURL(masterTrack)}
          layout='stacked-reverse'
        />
      </div>
    );
  };

  return (
    <div className='new-audio-card-container'>
      <div className={classNames('audio-card-first-column')}>
        <SongName />
        <SongDescription />
      </div>
      <div className='audio-card-second-column'>
        <AudioFile />
      </div>
    </div>
  );
});

export default NewAudioCard;
