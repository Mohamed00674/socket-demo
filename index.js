import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg); 
  });
});
io.on("connection", (socket) => {
  socket.emit("hello", "world");
});
 

io.on("connection", (socket) => {
  socket.join("some room")
  io.to("room 1").emit("hello", "world")
  io.except("room 1").emit('hello', "world")
  socket.leave("room 1 ")
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
