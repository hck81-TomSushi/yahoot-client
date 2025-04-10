import axios from "axios";

export const yahootServer = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://server-yahoot.hilminever.online/",
});