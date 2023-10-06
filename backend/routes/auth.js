const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const fetchUser=require("../middleware/fetchUser")


const User = require("../models/Users");
const { validationResult, body } = require("express-validator");
const JWT_Token = "naman@123$"
router.use(express.json());

router.post(
  "/createUser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("bad");
      return res.status(400).send("bad");
    }

    try {
      console.log("try block running");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(hashedPassword);


      const user = await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id

        }
      }
      await user.save();
      const jwtData = jwt.sign(data, JWT_Token)
      console.log("Your jwt Token is");
      console.log(jwtData);

      console.log(req.body);
      const myObj={token:jwtData,success:true}
      res.status(200).send(myObj)
    } catch (error) {
      console.log("Already exists");
      return res.status(200).send({success:false});
    }
  }
  );
  router.post("/verify",async(req,res)=>{ 
    const otp=Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111
    console.log("Your Otp is:",otp);
    const accountSid = "ACee76ed4528326ece0e2cfe2f8300654a";
const authToken ="74dc80a9cfa4dce49bb491145223ba33";
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
     body: `Your otp For INotebook is ${otp}`,
     from: '+15739833253',
     to: '+919068808000'
   })
  .then(message => {console.log(message.sid)});

  })
  router.post("/login",[
    
    body("email").isEmail()
  ], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("bad");
      return res.status(400).send("bad");
    }
    const {email,password}=req.body
    try{
      let user=await User.findOne({email})
      if(!user){
        console.log("User Doesn Not Exist");
        res.status(200).send({success:false})
      }
      const passwordCompare=await bcrypt.compare(password,user.password)
      if(!passwordCompare){
        console.log("Sorry Password Is InCorrect")
        res.status(200).send({success:false})
      }
      const data = {
        user: {
          id: user.id

        }
      }
      const jwtData =  jwt.sign(data, JWT_Token)
      const myObj={token:jwtData,success:true}
      res.status(200).send(myObj)


    }
    catch(error){
      console.log("internal Server Error");
    }

  })
router.post("/getuser",fetchUser,async (req,res)=>{
  try{
    console.log("Everything is Fine");
    const userId=req.user.id;
    const myuser=await User.findById(userId).select("-password")
    res.status(200).send(myuser)

  }
  catch(error){
    console.log("Getting Error ");
    res.status(400).send(error)
  }

})

module.exports = router;
