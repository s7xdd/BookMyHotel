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

var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser())

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(process.env.MONGO)
  .then((response) => console.log("Mongo connection success"))
  .then((error) => console.log(error));


app.post("/register", async (req, res) => {
  const { email, username, password, isAdmin } = req.body;
  try {
    const checkUser = await UserModel.findOne(
        {$or: [
            {email: email},
            {username: username}
        ]
    });

    if (checkUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const response = await UserModel.create({
        email,
        username,
        password: bcrypt.hashSync(password, salt),
        isAdmin
      });
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "User not created" });
  }
});




app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await UserModel.findOne({ username: username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      //logged in
      jwt.sign({ username, id: userDoc._id }, process.env.SECRET, {}, (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { withCredentials: true, httpOnly: false })
          .json({
            id: userDoc._id,
            username,
          });
      });
    } else {
      //not logged in
      res.status(400).json({ message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed" });
  }
});

app.get("/user/profile", (req, res) => {
    const { token } = req.cookies;
    try {
      jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
        if (err) throw err;
        const userDoc = await UserModel.findOne({ username: info.username });
        res.status(200).json({
            id: userDoc._id,
            username : userDoc.username,
            firstname: userDoc.firstname,
            email: userDoc.email,
            surname: userDoc.surname,
            phone: userDoc.phone,
            address1: userDoc.address1,
            address2: userDoc.address2,
            postcode: userDoc.postcode,
            state: userDoc.state,
            area: userDoc.area,
            country: userDoc.country,
        })
      });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.put("/user/profile", async (req,res) => {
    const { token } = req.cookies;

    const { 
        firstname,
        surname,
        phone,
        address1,
        address2,
        postcode,
        state,
        area,
        country} = req.body
   
  try {
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) throw err;
      const userDoc = await UserModel.findOne({ username: info.username });
      
      userDoc.firstname = firstname;
      userDoc.surname = surname;
      userDoc.phone = phone;
      userDoc.address1 = address1;
      userDoc.address2 = address2;
      userDoc.postcode = postcode;
      userDoc.state = state;
      userDoc.area = area;
      userDoc.country = country;
      
      await userDoc.save();

        res.json(userDoc);
    });
  } catch (error) {
    res.status(400).json(error);
  }
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, process.env.SECRET, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//Admin login
app.post('/admin/login', async (req,res) => {
    const { username, password } = req.body;

        const userDoc = await UserModel.findOne({ username: username });
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
          //logged in
          if (userDoc.isAdmin){
            jwt.sign({ username, id: userDoc._id }, process.env.SECRET, {}, (err, token) => {
                if (err) throw err;
                res
                  .cookie("token", token, { withCredentials: true, httpOnly: false })
                  .json({
                    id: userDoc._id,
                    username,
                  });
              });
          } else {
            res.status(400).json({msg: "you dont have permission to access this page"})
          }
          
        } else {
          //not logged in
          res.status(400).json({ message: "Wrong credentials" });
        }

})

//Admin dashboard (All posts)
app.post('/admin/dashboard', async (req,res) => {
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {

    })

})

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;

    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) throw err;
      const {
        title,
        content,
        location,
        amenities,
        price,
        smalldescription,
        description,
      } = req.body;
      const postDoc = await PostModel.create({
        title,
        img: newPath,
        content,
        location,
        amenities,
        price,
        smalldescription,
        description,
        host: info.id,
      });
      res.json(postDoc);
    });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
  }
});

app.put('/rooms/:id', uploadMiddleware.single('file'), async(req,res) => {
   
    try {

        let newPath = null;

    if(req.file){
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length-1]
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    const {token} = req.cookies;

    jwt.verify(token, process.env.SECRET, {}, async (err,info) => {
        if(err) throw err;
        const{id, 
            title,
            img,
            content,
            location,
            amenities,
            price,
            smalldescription,
            description
        } = req.body;
        const postDoc = await PostModel.findById(id);

        const isHost = postDoc.host == info.id
        
        if(!isHost){
            return res.status(400).json('You are not the host')
        }

        postDoc.title = title;
        postDoc.content = content;
        postDoc.description = description;
        postDoc.location = location;
        postDoc.amenities = amenities;
        postDoc.price = price;
        postDoc.smalldescription = smalldescription;
        postDoc.img = newPath ? newPath : postDoc.img

        await postDoc.save();

        res.json(postDoc);
    })       

    } catch (error) {
        console.log(error)  
    }
    
})

app.get('/mylistings', async (req,res) => {
    const { token } = req.cookies;

    try {
        jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
        if (err) throw err;

        const post = await PostModel.find({host: info.id})
        res.json(post)
        if(!post){
            res.status(400).json({msg: 'Not found'})
        }

        });
    } catch (error) {
        res.status(400).json(error);
    }
})

app.get('/home/rooms', async (req,res) => {
    const posts = await PostModel.find().populate('host', 'username').sort({createdAt: -1}).limit(8);
    res.json(posts);
})

app.get('/rooms', async (req,res) => {
    const posts = await PostModel.find().populate('host', 'username');
    res.json(posts);
})

app.get('/rooms/:id', async (req, res) => {
    const {id} = req.params;
    const post = await PostModel.findOne({_id: id}).populate('host', 'username')
    res.json(post)
})

app.get('/rooms/search/:title', async (req,res) => {
    const {title} = req.params;
    try {
        const post = await PostModel.find({
            $or: [
                { title: { $regex: title, $options: 'i' } },
                { place: { $regex: title, $options: 'i' } }
              ]
        })
        res.json(post)
        if(!post){
            res.status(400).json({msg: 'Not found'})
        }
    } catch (error) {
        res.status(400).json({msg: 'Error'})
    }
})

app.delete('/post/:id', async (req,res) => {
    const {token} = req.cookies;
    try {
        jwt.verify(token, process.env.SECRET, {}, async (err,info) => {
            if(err) throw err;
            const {id} = req.params;
            const postDoc = await PostModel.findById(id);
            if(postDoc){
                const isHost = postDoc.host == info.id
                if(!isAuthor){
                    return res.status(400).json('You are not the author')
                }
                await postDoc.deleteOne({_id: id});
            }
            res.status(200).json({msg: 'Success'});
        })       
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: 'error'})
    }
})



app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.get("/", (req, res) => {
  res.send(200).json({ msg: "Hello world" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Listening on port ${process.env.PORT}`);
});
