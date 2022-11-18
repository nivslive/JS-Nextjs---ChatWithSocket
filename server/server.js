// import Socket from "socket.io";
const server = require("http").createServer();
import { io } from "socket.io-client";
// import { useState } from "react";
const servering = require("socket.io")(server);
servering.on("connection", (socket) => {
  console.log("Conectando...");
  socket.on('channel',(data)=>{
    servering.emit('message', data)
  })

});
server.listen(3001);


const URL = "https://nx-front-nivslive.vercel.app/socket";
const Socket = io(URL, { transports: ["websocket"] });
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });
export default Socket;
