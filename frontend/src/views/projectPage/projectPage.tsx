import React, { useEffect, useMemo, useState } from 'react';
import './projectPage.scss';
import { Project } from '../../models/project';
import ProjectTag from '../../components/ProjectTag/projectTag';
import DisplayUser from '../../components/DisplayUser/displayUser';
import TrackRow from '../../components/TrackRow/trackRow';
import { BsFillPauseFill, BsFillPlayFill, BsUpload } from 'react-icons/bs';
import { useEventListener } from '../../hooks';
import Modal from 'react-modal';
import ModalContent from './ModalContent/modalContent';
import Loader from '../../components/Loader/loader';
import http from '../../services/http';
import { useParams } from 'react-router';
import { SuggestionStatus } from '../../models/suggestion';

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

  const getSuggestionsByStatus = (
    status: SuggestionStatus,
    project?: Project
  ) => project?.suggestions.filter((track) => track.status == status) ?? [];

  const approvedTracks = useMemo(
    () => getSuggestionsByStatus(SuggestionStatus.APPROVED, project),
    [project]
  );

  const suggestions = useMemo(
    () => getSuggestionsByStatus(SuggestionStatus.PENDING, project),
    [project]
  );

  useEffect(() => {
    loadProject();
  }, [reloadFlag]);

  const loadProject = async () => {
    setLoading(true);
    try {
      const loadedProject: Project = (await http.get(`/projects/${id}`)).data;
      setProject(loadedProject);
      setSelectedTracks([
        ...getSuggestionsByStatus(SuggestionStatus.APPROVED, loadedProject).map(
          (s) => s.track._id
        ),
        loadedProject.masterTrack._id
      ]);
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
            title='Play/Pause selected tracks (Also activates on spacebar press)'
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
        isDisabled={!selectedTracks.includes(project.masterTrack._id)}
        id={project.masterTrack._id}
        key={project.masterTrack._id}
        track={project.masterTrack}
        onMutePressed={handleTrackChange}
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
              id={suggestion._id}
              key={suggestion._id}
              track={suggestion.track}
              isPlaying={isPlaying}
              author={suggestion.suggester}
              createdAt={suggestion.creationDate}
              description={suggestion.description}
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
            key={suggestion._id}
            id={suggestion._id}
            track={suggestion.track}
            isPlaying={isPlaying}
            onMutePressed={handleTrackChange}
            author={suggestion.suggester}
            projectOwner={project.author._id}
            description={suggestion.description}
            createdAt={suggestion.creationDate}
            pos={posToJumpTo}
            onPosChange={(currentTIme?: number) => {
              if (currentTIme) {
                setPosToJumpTo(currentTIme);
              }
            }}
            reloadProject={reloadProject}
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
