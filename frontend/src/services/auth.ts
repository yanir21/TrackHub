export interface DecodedToken {
  username: string;
  displayName: string;
  // other properties of your decoded token object
}

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUsername = () => {
  return localStorage.getItem('username') || '';
};

export const getDisplayName = () => {
  return localStorage.getItem('displayName') || '';
};
