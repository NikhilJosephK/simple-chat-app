// api/server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

// Expose the server as a Vercel serverless function
export default (req, res) => {
  server.listen(0, () => {
    console.log("Server started");
  });
};
