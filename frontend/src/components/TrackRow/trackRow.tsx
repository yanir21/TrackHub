import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import WaveformPlayer from '../waveformPlayer/waveformPlayer';
import './trackRow.scss';
import { Track } from '../../models/track';
import { GoMute, GoUnmute } from 'react-icons/go';
import { User } from '../../models/user';
import { Tooltip } from 'react-tooltip';
import { AuthContext } from '../../App';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { AuthContextType } from '../../models/AuthContext';
import { SuggestionStatus } from '../../models/suggestion';
import { updateSuggestionStatus } from '../../services/trackService';

interface TrackRowProps {
  track: Track;
  isDisabled: boolean;
  isPlaying: boolean;
  id: string;
  onMutePressed?: (track: string) => void;
  onSoloPressed?: () => void;
  pos: number;
  onPosChange: (currentTIme?: number) => void;
  author?: User;
  description?: string;
  createdAt?: Date;
  projectOwner?: string;
  reloadProject?: () => void;
}

const TrackRow = (props: TrackRowProps) => {
  const {
    isDisabled,
    track,
    id,
    isPlaying,
    onMutePressed,
    onSoloPressed,
    pos,
    onPosChange,
    author,
    description,
    createdAt,
    projectOwner,
    reloadProject: reloadTracks
  } = props;

  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const dateString = useMemo(() => {
    if (createdAt) {
      const date = new Date(createdAt);
      return `${date.toLocaleDateString()}, ${date
        .toLocaleTimeString()
        .slice(0, 5)}`;
    } else {
      return '';
    }
  }, [createdAt]);

  const approveTrack = async () => {
    try {
      await updateSuggestionStatus(id, SuggestionStatus.APPROVED);
      reloadTracks?.();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectTrack = async () => {
    try {
      await updateSuggestionStatus(id, SuggestionStatus.REJECTED);
      reloadTracks?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='track-row-container'>
      {author && (
        <div className='suggestion-details'>
          <span className='left-details'>
            <span className='author-details'>{author.displayName}: </span>
            <span className='track-description'> {description}</span>
          </span>
          <span className='right-details'>
            {projectOwner && currentUser?.sub === projectOwner && (
              <span className='owner-controls'>
                <Tooltip
                  content='Approve this suggestion'
                  anchorSelect='.approve-button'
                  style={{ backgroundColor: '#1c1f26' }}
                />
                <AiOutlineCheckCircle
                  id='check'
                  className='approve-button'
                  onClick={approveTrack}
                />
                <Tooltip
                  content='Reject this suggestion'
                  anchorSelect='.reject-button'
                  style={{ backgroundColor: '#1c1f26' }}
                />
                <AiOutlineCloseCircle
                  className='reject-button'
                  onClick={rejectTrack}
                />
              </span>
            )}
            <span className='date-container'>{dateString}</span>
          </span>
        </div>
      )}
      <div className={classNames('track-row')} key={id}>
        <div
          className={classNames('waveform-container', {
            disabled: isDisabled
          })}
        >
          <WaveformPlayer
            audio={track.url}
            id={id}
            isPlaying={isPlaying}
            isDisabled={isDisabled}
            pos={pos}
            onPosChange={onPosChange}
          />
        </div>
        {onMutePressed && (
          <div
            className='control-box'
            onClick={() => onMutePressed?.(track._id)}
          >
            {isDisabled ? (
              <>
                <GoUnmute />
                Unmute
              </>
            ) : (
              <>
                <GoMute />
                Mute
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackRow;
