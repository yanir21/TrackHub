import http from './http';

export const serverLogin = async (username: string, password: string) =>
  await http.post('/auth/login', { username, password });

export const register = async (
  username: string,
  password: string,
  displayName: string
) => await http.post('/users/register', { username, password, displayName });
