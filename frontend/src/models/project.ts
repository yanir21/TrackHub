import { Tag } from "./tag";
import { User } from "./user";

export interface Project {
  author: User;
  title: string;
  description: string;
  tags: Tag[];
}
