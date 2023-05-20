import React, { useState } from 'react';
import './projectPage.scss';
import WaveformPlayer from '../../components/waveformPlayer/waveformPlayer';
import classNames from 'classnames';
import { Project } from '../../models/project';

const track1 = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track1.mp3';
const track2 = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';
const track3 = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track3.mp3';

const project: Project = {
  _id: 'eliko',
  author: { username: 'mazi', displayName: 'Mazi Cohen', id: '1' },
  description:
    'This is a great song I started a couple weeks ago, contributers are welcome!',
  masterTrack: 'abc',
  suggestions: ['abc', 'cde', 'efg'],
  title: 'My Humble Demise',
  tags: [
    { _id: '1', name: 'Hip Hop' },
    { _id: '2', name: 'Electronic' }
  ]
};

const ProjectPage = () => {
  const allTracks = [track1, track2, track3];
  const [selectedTracks, setSelectedTracks] = useState<string[]>(allTracks);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleTrackChange = (isChecked: boolean, track: string) => {
    if (isChecked) {
      setSelectedTracks((selectedTracks) => [...selectedTracks, track]);
    } else {
      setSelectedTracks((selectedTracks) =>
        selectedTracks.filter((currentTrack) => currentTrack != track)
      );
    }
  };

  return (
    <div className='song-page'>
      <div className='section-header'>Project overview</div>
      <div
        className='play-button'
        onClick={setIsPlaying.bind(this, !isPlaying)}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </div>
      {[track1, track2, track3].map((track, index) => (
        <div
          className={classNames('track-container', {
            disabled: !selectedTracks.includes(track)
          })}
          key={index}
        >
          <input
            type='checkbox'
            className='checkbox-round'
            onChange={(e) => handleTrackChange(e.target.checked, track)}
            title='nadavi'
            checked={selectedTracks.includes(track)}
          />
          <WaveformPlayer
            url={track}
            id={index}
            isPlaying={isPlaying && selectedTracks.includes(track)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectPage;
