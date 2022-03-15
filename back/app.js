const express = require("express");
const app = express();
//******* SE REQUIRE Y SE USAR CORS PARA NO TENER PROBLEMAS CON LOS
//******* REQUEST
const cors = require("cors");
app.use(cors());
//***********

const server = require("http").createServer(app);

//***** PASANDO EL SERVER AL SOCKET */
const io = require("socket.io")(server);

io.on("connection", (client) => {
  //*** CUANDO UN CLIENTE EMITA EL EVENTO "EMOJI" ENVIA EL EMOJI (DATA) */
  client.on("emoji", (data) => {
    //*** EL EMIJO(DATA) SE REGRESA A TODOS LOS CLIENTES CONECTADOS */
    //*** MEDIANTE EL EVENTO "EMOJI_RECEIVE" */
    io.sockets.emit("emoji_receive", data);
  });
});
//**** INICIANDO EL SERVIDOR */
server.listen(3000, () => {
  console.log("Corriendo app");
});
