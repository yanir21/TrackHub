import React, { useState } from 'react';
import { Project } from '../../models/project';
import DisplayUser from '../DisplayUser/displayUser';
import ProjectTag from '../ProjectTag/projectTag';
import classNames from 'classnames';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import './exploreAudioCard.scss';
interface ExploreAudioCardProps {
  project: Project;
  showAuthor?: boolean;
}

export default function ExploreAudioCard({
  project,
  showAuthor = true
}: ExploreAudioCardProps) {
  const [readMoreClicked, setReadMoreClicked] = useState(false);

  const SongName = () => <div className='song-name'>{project.title}</div>;

  const SongDescription = () => (
    <div className='song-description'>
      {project.description.length < 50 || readMoreClicked ? (
        project.description
      ) : (
        <>
          {project.description.slice(0, 50).trim() + '...'}
          <ReadMore />
        </>
      )}
    </div>
  );

  const ReadMore = () => (
    <button className='read-more' onClick={() => setReadMoreClicked(true)}>
      Read More
    </button>
  );

  const AudioFile = () => {
    // get audio from internet for mock
    const audioFile =
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    return (
      <div className='audio-file-container'>
        <AudioPlayer src={audioFile} layout='stacked-reverse' />
      </div>
    );
  };

  return (
    <div className='audio-card-container'>
      <div
        className={classNames('audio-card-first-column', {
          'author-displayed': showAuthor
        })}
      >
        {showAuthor && <DisplayUser displayName={project.author.displayName} />}
        <SongName />
        <SongDescription />
      </div>
      <div className='audio-card-second-column'>
        <AudioFile />
        <div className='tags'>
          {project.tags.map((tag) => (
            <ProjectTag tag={tag} key={tag._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
