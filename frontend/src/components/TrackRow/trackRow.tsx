import classNames from 'classnames';
import React from 'react';
import WaveformPlayer from '../waveformPlayer/waveformPlayer';
import './trackRow.scss';

interface TrackRowProps {
  track: string;
  isDisabled: boolean;
  isPlaying: boolean;
  id: number;
  onMutePressed?: (track: string) => void;
  onSoloPressed?: () => void;
}

const TrackRow = (props: TrackRowProps) => {
  const { isDisabled, track, id, isPlaying, onMutePressed, onSoloPressed } =
    props;
  return (
    <div className={classNames('track-row')} key={id}>
      <div
        className={classNames('waveform-container', {
          disabled: isDisabled
        })}
      >
        <WaveformPlayer
          url={track}
          id={id}
          isPlaying={isPlaying && !isDisabled}
        />
      </div>
      {onMutePressed && (
        <div className='control-box' onClick={() => onMutePressed?.(track)}>
          {isDisabled ? 'Unmute' : 'Mute'}
        </div>
      )}
    </div>
  );
};

export default TrackRow;
