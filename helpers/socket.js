import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  auth: {
    token: localStorage.getItem("access_token"),
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});