import express from "express";
import dbConnection from "./db/index.js";
import { User } from "./models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dbConnection();

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
        }
        else{
            const payload={
                userId: user._id,
                email: user.email
            }
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "THISKJCKACBmnvbjNBD_JWT_SECRET_KEYncjkxcNCKDBCK"
            jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 84600}, async(err, token)=>{
                await User.updateOne({_id: user._id}, {
                    $set: {token}
                })
                user.save();
                next()
            })

            res.json({
                status: 200,
                user:{email: user.email, fullName: user.fullName, token:user.token}
            })
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

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
