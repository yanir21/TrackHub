import http from "./http";

export const login = async (username: string, password: string) =>
  (await http.post("/login", { username, password })).data;

export const register = async (username: string, password: string) =>
  (await http.post("/register", { username, password })).data;
