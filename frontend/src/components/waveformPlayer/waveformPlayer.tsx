import React, { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './waveformPlayer.scss';

interface WaveformPlayerProps {
  url: string;
  id: number;
  isPlaying: boolean;
}

const WaveformPlayer = (props: WaveformPlayerProps) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [waveform, setWaveform] = useState<WaveSurfer>();

  useEffect(() => {
    const waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: `#waveform-${props.id}`,
      backend: 'WebAudio',
      height: 80,
      progressColor: '#3fc2af',
      responsive: true,
      splitChannels: false,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    });

    waveform.load(props.url);
    setWaveform(waveform);
  }, []);

  useEffect(() => {
    if (props.isPlaying && waveform) {
      waveform!.play();
    } else if (waveform) {
      waveform.pause();
    }
  }, [props.isPlaying]);

  return (
    <div className='wave-container'>
      <div id={`waveform-${props.id}`} className='wave' />
      <audio id={`track-${props.id}`} src={props.url} />
    </div>
  );
};

export default WaveformPlayer;
