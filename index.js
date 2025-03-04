const express = require("express"); //import express library
const app = express();
const http = require("http"); //import http library
const { Server } = require("socket.io");

const server = http.createServer(app); //use the http to create a new server.
const io = new Server(server); //set up the socket.

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); //when a request, send them the index.html file. effectively created a new client.
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.broadcast.emit("connection", "a user connected"); //listens for events called connection. Fully free to create any events we like. Second argument is a function it will run on that event.
  //will emeit the event. send the connection event back to the cleint - "a user conneceted". Can also send out an object instead of the string - whatever makes sense.

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    //note - "disconnect" is a reserved event name.  Therefore, for the connection betweeen the HTML notice to others and this section below, have to use "disconnected"
    console.log("user disconnected"); //disconnect code pulled from socket.io.
    socket.broadcast.emit("disconnected", "a user disconnected"); //links to the html code.
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000"); //listen on a particular port.
});
