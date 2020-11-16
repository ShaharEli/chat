const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
app.use(express.static("../client/build"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("chat", data);
  });
  socket.on("name", (e) => {
    io.emit("chat", { name: e + " - logged in", message: "" });
  });
});

http.listen(8282, () => {
  console.log("listening on port 8282");
});
