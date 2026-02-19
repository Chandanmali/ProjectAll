require("dotenv").config();
const express = require("express");
const PORT = 5000;
const { chats } = require("./Data/data");
const cors = require("cors");
const mongoose = require("mongoose");
const { userModel } = require("./Model/userModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const multer = require("multer");
const upload = require("./middleware/upload");
const { Server } = require("socket.io");
const http = require("http");
const { userAuth } = require("./middleware/userAuth");
const MONGODB_URL = process.env.MONGODB_URL

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const ROOM = "group";

//app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log("DB connection failed"));

//websocket implementation
//2.backend server made connection with frontend and when connection happen callback fuction fire

//3.now client should be place in specific room or group so create room

io.on("connection", (socket) => {
  //2.
  console.log("a user connected", socket.id);

  //3.create room (listen)
  socket.on("joinRoom", async (userName) => {
    console.log(`${userName} is joining the room`);

    //4. client join the room
    await socket.join(ROOM); //now client join the room this message send to all client so go in client and emit to all

    //backend emit to all brodcast
    socket.to(ROOM).emit("roomNotice", userName);
  });

  socket.on("chatMessage", (msg) => {
    console.log(`${msg}`);
    socket.to(ROOM).emit("chatMessage", msg);
  });
});

app.get("/", (req, res) => {
  return res.send("Hello from server");
});

app.post("/api/signup", upload.single("avatar"), async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res.status(411).json({ msg: "Please enter required fields" });
  }

  const existingUser = await userModel.findOne({ email: email });

  if (existingUser) {
    return res.status(409).json({ msg: "Already registered user" });
  }

  const avatarUrl = req.file
    ? req.file.path // ⭐ CLOUDINARY URL path
    : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  await userModel.create({
    name: name,
    email: email,
    password: password,
    pic: avatarUrl,
  });

  return res.status(200).json({ success: "User register successfully" });
});

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(411).json({ msg: "Please enter required fields" });
  }

  const response = await userModel.findOne({
    email: email,
    password: password,
  });

  if (response) {
    const token = jwt.sign(
      {
        userId: response._id,
      },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    res.status(201).json({
      msg: "Login successfully",
      token: token,
    });
  } else {
    return res.status(404).json({ err: "User not found" });
  }
});

app.get("/api/users", userAuth, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await userModel.find(keyword);
  res.send(users);
  console.log(keyword);
});

server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
