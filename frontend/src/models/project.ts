import { Tag } from './tag';
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
  masterTrack: string;
  suggestions: string[];
}
