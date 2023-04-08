import { UserAuth } from './user';

export interface AuthContextType {
  currentUser?: UserAuth;
  login: (token: string, redirect?: boolean) => void;
  logout: () => void;
}
