import React from 'react';

import './songNameInput.scss';
import { useFormContext } from 'react-hook-form';

const SongNameInput = () => {
  const { register } = useFormContext();

  return (
    <div className='textInputWrapper'>
      <input
        {...register('songName', { required: true })}
        placeholder="Song's Name"
        type='text'
        className='textInput'
      />
    </div>
  );
};

export default SongNameInput;
