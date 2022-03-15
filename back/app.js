const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (client) => {
  client.on("emoji", (data) => {
    io.sockets.emit("emoji_receive", data);
  });
});

server.listen(3000, () => {
  console.log("Corriendo app");
});
