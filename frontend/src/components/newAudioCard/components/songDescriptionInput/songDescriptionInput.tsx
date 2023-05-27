import React from 'react';

import './songDescriptionInput.scss';

import { useFormContext } from 'react-hook-form';

const SongDescriptionInput = () => {
  const { register } = useFormContext();

  return (
    <div className='textInputWrapper'>
      <input
        {...register('songDescription', { required: true })}
        placeholder='Description'
        type='text'
        className='textInput'
      />
    </div>
  );
};

export default SongDescriptionInput;
