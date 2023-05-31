import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
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
import Loader from '../../components/Loader/loader';
import http from '../../services/http';
import { useParams } from 'react-router';
import { Suggestion, SuggestionStatus } from '../../models/suggestion';

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

const ProjectPage = () => {
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [posToJumpTo, setPosToJumpTo] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);
  const { id } = useParams();
  const [project, setProject] = useState<Project>();

  const handleSpacebarPress = (e: any) => {
    if (e.key === ' ' && !isModalOpen) {
      setIsPlaying((isPlaying) => !isPlaying);
    }
  };

  useEventListener('keydown', handleSpacebarPress);

  const handleTrackChange = (trackId: string) => {
    if (!selectedTracks.includes(trackId)) {
      setSelectedTracks((selectedTracks) => [...selectedTracks, trackId]);
    } else {
      setSelectedTracks((selectedTracks) =>
        selectedTracks.filter((currentTrack) => currentTrack != trackId)
      );
    }
  };

  const approvedTracks = useMemo(
    () =>
      project?.suggestions.filter(
        (track) => track.status == SuggestionStatus.APPROVED
      ) ?? [],
    [project]
  );

  const suggestions = useMemo(
    () =>
      project?.suggestions.filter(
        (track) => track.status == SuggestionStatus.PENDING
      ) ?? [],
    [project]
  );

  useEffect(() => {
    loadProject();
  }, [reloadFlag]);

  const loadProject = async () => {
    setLoading(true);
    try {
      const loadedProject = (await http.get(`/projects/${id}`)).data;
      setProject(loadedProject);
      setSelectedTracks(loadedProject.suggestions);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const reloadProject = () => {
    setReloadFlag((flag) => !flag);
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  if (loading || !project) {
    return (
      <div className='loader-container-explore-page'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='song-page'>
      <div className='section-header'>Project overview</div>
      <div className='project-top-line'>
        <div className='top-left'>
          <span className='project-title'>{project.title}</span>
          <span className='project-length'>1:24</span>
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
        track={project.masterTrack}
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

          {approvedTracks.map((suggestion, index) => (
            <TrackRow
              isDisabled={!selectedTracks.includes(suggestion.track._id)}
              id={`approved-${index}`}
              track={suggestion.track}
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

      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <TrackRow
            isDisabled={!selectedTracks.includes(suggestion.track._id)}
            id={`suggested-${index}`}
            track={suggestion.track}
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
          <span className='new-suggestion-label' onClick={openModal}>
            Submit one yourself
          </span>
        </span>
      )}
      <Modal
        style={modalStyles}
        isOpen={isModalOpen}
        closeTimeoutMS={200}
        contentLabel='Example Modal'
        onRequestClose={closeModal}
      >
        <ModalContent
          closeModal={closeModal}
          projectId={project._id}
          reloadProject={reloadProject}
        />
      </Modal>
    </div>
  );
};

export default ProjectPage;
