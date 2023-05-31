import { Suggestion } from './suggestion';
import { Tag } from './tag';
import { Track } from './track';
import { UserAuth } from './user';

export interface ProjectCreate {
  _id: string;
  author: UserAuth;
  title: string;
  description: string;
  tags: Tag[];
  masterTrack: File;
  suggestions: string[];
}

export interface Project {
  _id: string;
  author: UserAuth;
  title: string;
  description: string;
  tags: Tag[];
  masterTrack: Track;
  suggestions: Suggestion[];
}
