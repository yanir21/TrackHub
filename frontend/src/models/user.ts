export interface User {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  imageUrl?: String;
}

export interface UserAuth {
  id: string;
  sub: string;
  username: string;
  displayName: string;
}
