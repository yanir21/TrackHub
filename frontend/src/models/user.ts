export interface User {
  username: string;
  password: string;
  displayName: string;
  imageUrl?: String;
}

export interface UserAuth {
  id: string;
  username: string;
  displayName: string;
}
