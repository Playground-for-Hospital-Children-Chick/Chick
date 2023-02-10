const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dir = "/etc/letsencrypt/live/i8b207.p.ssafy.io/";

const options = {
  ca: fs.readFileSync(path.resolve(dir, "fullchain.pem")),
  key: fs.readFileSync(path.resolve(dir, "privkey.pem")),
  cert: fs.readFileSync(path.resolve(dir, "cert.pem")),
};
const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";

const httpsServer = require("https").createServer(options, (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Origin", APPLICATION_SERVER_URL);
  response.setHeader("Access-Control-Allow-Credentials", "true");
  console.log("Received request for " + request.url);
  response.writeHead(404);
  response.end();
});

const io = require("socket.io")(httpsServer, { cors: { origin: "*" } });
const port = 8001;

io.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    console.log("방입장  노드에서 front로 보내기 ", roomName);
    socket.join(roomName);
    socket.to(roomName).emit("welcome", roomName);
  });

  socket.on("drawing", (data, roomName) => {
    //Let every user know of the current drawing data, except current user who is drawing
    console.log("sessionId ", roomName);
    socket.broadcast.to(roomName).emit("drawing", data);
  });
  socket.on("erasing", (roomName) => {
    socket.broadcast.to(roomName).emit("erasing");
  });
});

httpsServer.listen(port, () => console.log(`server is running on port ${port}`));
// Create Session
