const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const axios = require("./axios");


let users = [];

io.on("connection", socket => {
  socket.on('identification', publicId => {
    users.push({...socket, publicId});
    console.log(users.length)
    socket.on('send_message', ({sender, receiver, messageDetails}) => {
      console.log(messageDetails);
      const receiverSocket = users.find(socket => socket.publicId === receiver).id;
      io.sockets.sockets[receiverSocket].emit('receive_message', {sender, messageDetails})
    })
  });
});

server.listen(process.env.PORT || 4000, () =>
  console.log("the server is running on port 4000")
);
