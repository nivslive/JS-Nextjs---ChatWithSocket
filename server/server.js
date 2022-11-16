// import Socket from "socket.io";
const server = require("http").createServer();

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("Conectando...");
  socket.on('channel',(data)=>{
    io.emit('message', data)
  })

});
server.listen(3001);
