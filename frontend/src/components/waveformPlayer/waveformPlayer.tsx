import React, { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './waveformPlayer.scss';

const WaveformPlayer = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [waveform, setWaveform] = useState<WaveSurfer>();
  useEffect(() => {
    const track = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

    const waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      splitChannels: false,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    });

    waveform.load(track);
    setWaveform(waveform);
  }, []);

  const handlePlay = () => {
    setPlaying(!playing);
    waveform!.playPause();
  };

  const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

  return (
    <div className='waveform-container'>
      <div onClick={handlePlay}>{!playing ? 'Play' : 'Pause'}</div>
      <div id='waveform' className='wave' />
      <audio id='track' src={url} />
    </div>
  );
};

export default WaveformPlayer;
