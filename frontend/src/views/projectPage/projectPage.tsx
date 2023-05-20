import React, { useState } from 'react';
import './projectPage.scss';
import WaveformPlayer from '../../components/waveformPlayer/waveformPlayer';
import classNames from 'classnames';
import { Project } from '../../models/project';
import ProjectTag from '../../components/ProjectTag/projectTag';
import DisplayUser from '../../components/DisplayUser/displayUser';
import { AudioFile } from '../../components/ExploreAudioCard/exploreAudioCard';
import TrackRow from '../../components/TrackRow/trackRow';

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
const length = '1:24';

const ProjectPage = () => {
  const allTracks = [track1, track2, track3];
  const [selectedTracks, setSelectedTracks] = useState<string[]>(allTracks);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleTrackChange = (track: string) => {
    if (!selectedTracks.includes(track)) {
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
      <div className='project-top-line'>
        <div className='top-left'>
          <span className='project-title'>{project.title}</span>
          <span className='project-length'>{length}</span>
        </div>
        <div className='top-right'>
          <div className='tags'>
            {project.tags.map((tag) => (
              <ProjectTag tag={tag} key={tag._id} />
            ))}
          </div>
        </div>
      </div>
      <div className='middle-section'>
        <DisplayUser displayName={project.author.displayName} />
      </div>
      <div className='section-header'>Description</div>
      <div className='project-description'>{project.description}</div>
      <div className='section-header'>Master Track</div>
      <TrackRow
        isDisabled={false}
        id={6969}
        track={track1}
        isPlaying={isPlaying}
      />
      <div className='section-header'>Suggested Tracks</div>

      {[track1, track2, track3].map((track, index) => (
        <TrackRow
          isDisabled={!selectedTracks.includes(track)}
          id={index}
          track={track}
          isPlaying={isPlaying}
          onMutePressed={handleTrackChange}
        />
      ))}
    </div>
  );
};

export default ProjectPage;
