import axios from "axios";
import { redirect } from "react-router-dom";

const http = axios.create({
  baseURL: "http://localhost:3001",
});

http.interceptors.request.use(async (config) => {
  //   const token = await getToken();
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   } else {
  // window.location.href = "/login";
  //   }
  return config;
});

export default http;
