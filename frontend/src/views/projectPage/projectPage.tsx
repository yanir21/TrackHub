import React, { KeyboardEvent, useEffect, useState } from 'react';
import './projectPage.scss';
import { Project } from '../../models/project';
import ProjectTag from '../../components/ProjectTag/projectTag';
import DisplayUser from '../../components/DisplayUser/displayUser';
import { AudioFile } from '../../components/ExploreAudioCard/exploreAudioCard';
import TrackRow from '../../components/TrackRow/trackRow';
import { BsFillPauseFill, BsFillPlayFill, BsUpload } from 'react-icons/bs';
import { useEventListener } from '../../hooks';
import UploadAudioButton from '../newProjectPage/UploadAudioButton/uploadAudioButton';
import NewAudioCard from '../../components/newAudioCard/newAudioCard';
import Modal from 'react-modal';
import ModalContent from './ModalContent/modalContent';

const track1 = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track1.mp3';
const track2 = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';
const track3 = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track3.mp3';
const modalStyles = {
  overlay: { zIndex: 3, backgroundColor: 'rgba(0,0,0,0.8)' },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1c1f26',
    zIndex: '5',
    transition: '0.3s',
    borderColor: 'black'
  }
};

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
  const suggestedTracks = [track1, track3];
  const approvedTracks: string[] = [track2];
  const [selectedTracks, setSelectedTracks] =
    useState<string[]>(approvedTracks);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [posToJumpTo, setPosToJumpTo] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSpacebarPress = (e: any) => {
    if (e.key === ' ' && !isModalOpen) {
      setIsPlaying((isPlaying) => !isPlaying);
    }
  };

  useEventListener('keydown', handleSpacebarPress);

  const handleTrackChange = (track: string) => {
    if (!selectedTracks.includes(track)) {
      setSelectedTracks((selectedTracks) => [...selectedTracks, track]);
    } else {
      setSelectedTracks((selectedTracks) =>
        selectedTracks.filter((currentTrack) => currentTrack != track)
      );
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

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
      <div className='header-container'>
        <div className='section-header'>Description</div>
        <span className='upload-button' onClick={openModal}>
          <BsUpload />
          Contribute
        </span>
      </div>
      <div className='project-description'>{project.description}</div>
      <div className='header-container'>
        <div className='section-header'>Master Track</div>
        <span className='project-controls'>
          <span
            className='play-button'
            onClick={setIsPlaying.bind(this, !isPlaying)}
          >
            {isPlaying ? (
              <span className='control'>
                <BsFillPauseFill /> Pause
              </span>
            ) : (
              <span className='control'>
                <BsFillPlayFill /> Play
              </span>
            )}
          </span>
        </span>
      </div>
      <TrackRow
        isDisabled={false}
        id={'master'}
        track={track1}
        isPlaying={isPlaying}
        pos={posToJumpTo}
        onPosChange={(currentTIme?: number) => {
          if (currentTIme) {
            setPosToJumpTo(currentTIme);
          }
        }}
      />
      {approvedTracks.length > 0 && (
        <>
          <div className='section-header'>Approved Tracks</div>

          {approvedTracks.map((track, index) => (
            <TrackRow
              isDisabled={!selectedTracks.includes(track)}
              id={`approved-${index}`}
              track={track}
              isPlaying={isPlaying}
              onMutePressed={handleTrackChange}
              pos={posToJumpTo}
              onPosChange={(currentTIme?: number) => {
                if (currentTIme) {
                  setPosToJumpTo(currentTIme);
                }
              }}
            />
          ))}
        </>
      )}
      <div className='section-header'>Suggested Tracks</div>

      {suggestedTracks.length > 0 ? (
        suggestedTracks.map((track, index) => (
          <TrackRow
            isDisabled={!selectedTracks.includes(track)}
            id={`suggested-${index}`}
            track={track}
            isPlaying={isPlaying}
            onMutePressed={handleTrackChange}
            pos={posToJumpTo}
            onPosChange={(currentTIme?: number) => {
              if (currentTIme) {
                setPosToJumpTo(currentTIme);
              }
            }}
          />
        ))
      ) : (
        <span className='no-tracks-label'>
          The are no suggestions yet.
          <span className='new-suggestion-label'> Submit one yourself</span>
        </span>
      )}
      <Modal
        style={modalStyles}
        isOpen={isModalOpen}
        closeTimeoutMS={200}
        contentLabel='Example Modal'
        onRequestClose={closeModal}
      >
        <ModalContent closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default ProjectPage;
