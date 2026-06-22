import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "https://platform-mu-steel.vercel.app",
        "https://platform-db7k.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "https://teacher-dashboard-taupe.vercel.app",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);

      console.log(`User ${userId} joined room ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }

  return io;
};