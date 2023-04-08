import { UserAuth } from '../models/user';
import jwt_decode from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const decodeToken = (token: string): UserAuth => jwt_decode(token);
