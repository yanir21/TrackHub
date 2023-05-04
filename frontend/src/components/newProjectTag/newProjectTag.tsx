import React from 'react';
import { Tag } from '../../models/tag';
import './newProjectTag.scss';

interface ProjectTagProps {
  tag: Tag;
}

export default function NewProjectTag({ tag }: ProjectTagProps) {
  return <div className='new-project-tag'>{tag.name}</div>;
}
