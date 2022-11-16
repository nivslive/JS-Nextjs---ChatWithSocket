import { io } from "socket.io-client";
// import { useState } from "react";

const URL = "http://localhost:3001";
const socket = io(URL, { transports: ["websocket"] });
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });
export default socket;
