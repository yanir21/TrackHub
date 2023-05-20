import React from 'react';
import useGetTags from '../../../hooks/useGetTags';
import NewProjectTag from '../../../components/newProjectTag/newProjectTag';
import './tags.scss';
import { Controller, useFormContext } from 'react-hook-form';

export default function Tags() {
  const { data: tags, error: tagsError, loading: tagsLoading } = useGetTags();
  const { control } = useFormContext();
  if (tagsError) {
    return <div> error, try again later </div>;
  }

  if (tagsLoading) {
    return <div> loading... </div>;
  }

  return (
    <div className='tags-container'>
      <div className='tags'>
        {tags?.map((tag, index) => {
          return (
            <div className='tag'>
              <Controller
                key={index}
                name={`tags[${tag._id}].isClicked`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <NewProjectTag
                    isClicked={field.value}
                    tag={tag}
                    key={tag._id}
                    onClick={() => field.onChange(!field.value)}
                  />
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
