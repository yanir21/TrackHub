import React from 'react';
import useGetTags from '../../../hooks/useGetTags';
import NewProjectTag from '../../../components/newProjectTag/newProjectTag';
import './tags.scss';

export default function Tags() {
  const { data: tags, error: tagsError, loading: tagsLoading } = useGetTags();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  if (tagsError) {
    return <div> error :( </div>;
  }

  if (tagsLoading) {
    return <div> loading... </div>;
  }

  const handleTagClicked = (clickedTagId: string) => {
    if (selectedTags.includes(clickedTagId)) {
      setSelectedTags((prev) => prev.filter((tagId) => tagId !== clickedTagId));
    } else {
      setSelectedTags((prev) => [...prev, clickedTagId]);
    }
  };

  return (
    <div className='tags-container'>
      <div className='tags'>
        {tags?.map((tag) => {
          return (
            <div className='tag'>
              <NewProjectTag
                isClicked={selectedTags.includes(tag._id)}
                tag={tag}
                key={tag._id}
                onClick={() => handleTagClicked(tag._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
