const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

dotenv.config({ path: "./config/env/config.env" });
connectDB();

/* ------------------------------- MiddleWares ------------------------------ */

// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
/* -------------------------------------------------------------------------- */

/* --------------------------------- Routes --------------------------------- */
app.use("/images", express.static(path.join(__dirname + "/Images")));
app.use("/auth", require("./routes/auth"));
app.use("/patient", require("./routes/patient"));
app.use("/conversation", require("./routes/conversation"));
app.use("/message", require("./routes/messages"));

/* -------------------------------------------------------------------------- */

/* ------------------------------ Server Setup ------------------------------ */
const PORT = process.env.PORT || 8000;

var Server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
/* -------------------------------------------------------------------------- */

/* ------------------------------- Chat Setup ------------------------------- */
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

var IO = require("socket.io")(Server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

IO.on("connection", (socket) => {
  console.log("User is connected", socket.id);
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    if (userId) {
      addUser(userId, socket.id);
    }
    IO.emit("getUsers", users);
    console.log(users);
  });

  //send and get message
  socket.on("sendMessage", (receiverId, senderId, text) => {
    console.log(senderId);
    console.log(receiverId);
    console.log(users);
    const user = getUser(receiverId);
    if (!user) {
      return;
    }
    console.log(user);
    IO.to(user.socketId).emit("getMessage", {
      sender: senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    IO.emit("getUsers", users);
  });
});
