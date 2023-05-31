import classNames from 'classnames';
import React from 'react';
import WaveformPlayer from '../waveformPlayer/waveformPlayer';
import './trackRow.scss';
import { Track } from '../../models/track';
import { GoMute, GoUnmute } from 'react-icons/go';
import { User } from '../../models/user';

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
    description
  } = props;
  return (
    <div className={classNames('track-row')} key={id}>
      <div
        className={classNames('waveform-container', {
          disabled: isDisabled
        })}
      >
        {author && (
          <div className='suggestion-details'>
            <span className='author-details'>{author.displayName}: </span>
            <span className='track-description'> {description}</span>
          </div>
        )}
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
        <div className='control-box' onClick={() => onMutePressed?.(track._id)}>
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
  );
};

export default TrackRow;
