import React, { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './waveformPlayer.scss';
import { Track } from '../../models/track';

interface WaveformPlayerProps {
  audio: string;
  id: string;
  isPlaying: boolean;
  isDisabled: boolean;
  pos: number;
  onPosChange: (currentTIme?: number) => void;
}

const WaveformPlayer = (props: WaveformPlayerProps) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [waveform, setWaveform] = useState<WaveSurfer>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: `#waveform-${props.id}`,
      backend: 'WebAudio',
      height: 65,
      progressColor: '#3fc2af',
      responsive: true,
      splitChannels: false,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    });
    waveform.load(props.audio);
    setWaveform(waveform);
    waveform.once('ready', () => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (props.isPlaying && waveform) {
      waveform!.play();
    } else if (waveform) {
      waveform.pause();
    }
  }, [props.isPlaying]);

  useEffect(() => {
    if (props.isDisabled) {
      waveform?.setProgressColor('#717171');
    } else {
      waveform?.setProgressColor('#3fc2af');
    }
    waveform?.setMute(props.isDisabled);
  }, [props.isDisabled, waveform]);

  useEffect(() => {
    waveform?.setDisabledEventEmissions(['seek']);
    waveform?.seekTo(props.pos);
    waveform?.setDisabledEventEmissions([]);
  }, [props.pos]);

  useEffect(() => {
    waveform?.on('seek', (position) => {
      props.onPosChange(position);
    });
  }, [waveform]);

  return (
    <div className='wave-container'>
      <div id={`waveform-${props.id}`} className='wave' />
      {loading ? (
        <div className='lds-facebook'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <audio id={`track-${props.id}`}>
          <source src={props.audio} type='blobType' />
        </audio>
      )}
    </div>
  );
};

export default WaveformPlayer;
