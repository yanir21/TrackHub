import { Tag } from './tag';
import { User } from './user';

export interface Project {
  _id: string;
  author: User;
  title: string;
  description: string;
  tags: Tag[];
}
