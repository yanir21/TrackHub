import React, { useState } from 'react';
import { Project } from '../../models/project';
import DisplayUser from '../DisplayUser/displayUser';
import ProjectTag from '../ProjectTag/projectTag';
import classNames from 'classnames';
import './newAudioCard.scss';
import SongNameInput from './components/songNameInput/songNameInput';
import SongDescriptionInput from './components/songDescriptionInput/songDescriptionInput';
interface NewAudioCardProps {
  masterTrack: File;
  songNameChanged: (value: string) => void;
  songDescriptionChanged: (value: string) => void;
}

export default function NewAudioCard({
  masterTrack,
  songNameChanged,
  songDescriptionChanged
}: NewAudioCardProps) {
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
        <audio controls className='audio-file'>
          <source src={URL.createObjectURL(masterTrack)} type='audio/mpeg' />
        </audio>
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
}
