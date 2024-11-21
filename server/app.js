import express from "express";
import dbConnection from "./db/index.js";
import { User } from "./models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { Conversation } from "./models/Conversation.model.js";
import { Messages } from "./models/Messages.model.js";
import http from "http";
import { Server } from "socket.io";


const app = express();
const port = 4000;
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server); // Attach Socket.IO to the server

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dbConnection();



// socket connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (data) => {
      console.log("Message from client:", data);
      io.emit("message", `Server received: ${data}`);
  });

  socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("hello Akash");
});

//register user
app.post("/api/signup", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.json({
        status: 400,
        message: "Please enter all the details",
      });
    } else {
      const alreadyExists = await User.findOne({ email });
      if (alreadyExists) {
        res.json({
          status: 400,
          message: "User already exists with this email try to login",
        });
      } else {
        const newUser = new User({ fullName, email });
        bcryptjs.hash(password, 10, (err, hasPassword) => {
          newUser.set("password", hasPassword);
          newUser.save();
          next();
        });
        return res.json({
          status: 200,
          message: "User Register Successfully",
        });
      }
    }
  } catch (error) {
    res.json({
      status: 400,
      message: "Error while register the user",
    });
  }
});

//login user
app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({
        status: 400,
        message: "Please enter all the details",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.json({
          status: 400,
          message: "User not exists with this email try to register",
        });
      } else {
        const validatePassword = await bcryptjs.compare(
          password,
          user.password
        );
        if (!validatePassword) {
          return res.json({
            status: 400,
            message: "Password not matched",
          });
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY ||
            "THISKJCKACBmnvbjNBD_JWT_SECRET_KEYncjkxcNCKDBCK";
          jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 84600 },
            async (err, token) => {
              await User.updateOne(
                { _id: user._id },
                {
                  $set: { token },
                }
              );
              user.save();
              next();
            }
          );

          res.json({
            status: 200,
            user: {
              id: user._id,
              email: user.email,
              fullName: user.fullName,
              token: user.token,
            },
          });
        }
      }
    }
  } catch (error) {
    res.json({
      status: 400,
      message: "Error while login the user",
    });
  }
});

app.post("/api/logout", async (req, res) => {
  try {
    const {id} = req.body
    User.findByIdAndUpdate({id},
      {
        $unset: {
          token: 1,
        },
      },
      {
        new: true,
      }
    );
    res.json({ status: 200, message: "Successfully logout" });
  } catch (error) {
    console.log();
    res.json({
      status: 400,
      message: "Error while logout the user",
      Error: error,
    });
  }
});

app.post("/api/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    await newConversation.save();

    res.json({
      status: 200,
      message: "conversation created successfully",
    });
  } catch (error) {
    res.json({ status: 400, message: "Error while creating convesation" });
  }
});

app.get("/api/conversations/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });
    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await User.findById(receiverId);
        return {
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          conversationId: conversation._id,
        };
      })
    );

    res.json({
      status: 200,
      message: "Conversation getting successfully",
      conversations: conversations,
      conversationUserData: conversationUserData,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Error while try to get conversation",
    });
  }
});

app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId } = req.body;
    if (!senderId || !message) {
      res.json({
        status: 200,
        message: "Please enter message and senderId",
      });
    }
    if (!conversationId) {
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });

      await newConversation.save();
      const newMessage = new Messages({
        conversationId,
        senderId,
        message,
        receiverId,
      });
      await newMessage.save();

      res.json({
        status: 200,
        message: "conversation created successfully",
      });
    }

    const newMessage = new Messages({
      conversationId,
      senderId,
      message,
      receiverId,
    });
    await newMessage.save();
    res.json({
      status: 200,
      message: "message created successfully",
      senderMessage: newMessage,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Error while creating message",
    });
  }
});

app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    if (!conversationId) {
      res.json({
        status: 200,
        message: "you don't have convesation id",
      });
    }
    const messages = await Messages.find({ conversationId });
    const messageUserData = await Promise.all(
      messages.map(async (message) => {
        const user = await User.findById(message.senderId);
        return {
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          message: message.message,
        };
      })
    );
    res.json({
      status: 200,
      message: "message getting successfully",
      getingMessage: messageUserData,
    });
  } catch (error) {
    res.json({ status: 400, message: "error while getting the messages" });
  }
});

app.get("/api/getalluser", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: 200, message: "getting all users", users: users });
  } catch (error) {
    res.json({ status: 400, message: "error while getting the user" });
  }
});

server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
