import { Project } from './project';
import { Track } from './track';
import { User } from './user';

export enum SuggestionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface Suggestion {
  _id: string;
  suggester: User;
  description: string;
  creationDate: Date;
  track: Track;
  status: SuggestionStatus;
  project: Project;
}
