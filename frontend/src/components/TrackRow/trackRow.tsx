import classNames from 'classnames';
import React from 'react';
import WaveformPlayer from '../waveformPlayer/waveformPlayer';
import './trackRow.scss';
import { Track } from '../../models/track';

interface TrackRowProps {
  track: Track;
  isDisabled: boolean;
  isPlaying: boolean;
  id: string;
  onMutePressed?: (track: string) => void;
  onSoloPressed?: () => void;
  pos: number;
  onPosChange: (currentTIme?: number) => void;
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
    onPosChange
  } = props;
  return (
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
        <div className='control-box' onClick={() => onMutePressed?.(track._id)}>
          {isDisabled ? 'Unmute' : 'Mute'}
        </div>
      )}
    </div>
  );
};

export default TrackRow;
