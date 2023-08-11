import { Http2ServerRequest } from "http2";
import { Socket } from "socket.io-client";


const { Server } = require("socket.io");

const io = new Server(Http2ServerRequest, {
  cors: {
    origin: "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message) => {
    // Process the message and send it to other connected clients
    const chatMessage = {
      message: message,
      photo: "user_photo_url", // Replace with user photo URL
      userId: 1, // Replace with the user ID
      userName: "User Name", // Replace with the user name
      // id: uuid(), // Generate a unique ID for the message
    };

    // Broadcast the message to all connected clients
    io.emit("newMessage", chatMessage);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Other code and routes for your backend...
