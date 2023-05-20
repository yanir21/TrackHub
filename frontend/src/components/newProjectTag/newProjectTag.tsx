import React from 'react';
import { Tag } from '../../models/tag';
import './newProjectTag.scss';

interface ProjectTagProps {
  tag: Tag;
  isClicked: boolean;
  onClick: () => void;
}

export default function NewProjectTag({
  tag,
  isClicked,
  onClick
}: ProjectTagProps) {
  return (
    <div
      className={isClicked ? 'selected-new-project-tag' : 'new-project-tag'}
      onClick={onClick}
    >
      {tag?.name}
    </div>
  );
}
