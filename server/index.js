require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const UserModel = require("./Models/UserSchema");
const PostModel = require("./Models/PostSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const PORT = process.env.PORT || 4000;
var salt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(process.env.MONGO)
  .then((response) => console.log("Mongo connection success"))
  .then((error) => console.log(error));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkUser = await UserModel.findOne({ username });
    if (checkUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const response = await UserModel.create({
        username,
        password: bcrypt.hashSync(password, salt),
      });
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "User not created" });
  }
});

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await UserModel.findOne({username: username})
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
            //logged in
            jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token, { withCredentials: true, httpOnly: false}).json({
                    id:userDoc._id,
                    username,
                })
            })
        }
        else {
            //not logged in
            res.status(400).json({message: "Failed"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Failed"})
    }
   
})

app.get("/", (req, res) => {
  res.send(200).json({ msg: "Hello world" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Listening");
});
