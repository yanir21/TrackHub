import { UserAuth } from './user';

export interface AuthContextType {
  currentUser?: UserAuth;
  login: (token: string) => void;
  logout: () => void;
}
