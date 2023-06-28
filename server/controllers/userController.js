const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
exports.signup = async (req, res, next) => {
  try {
    console.log("signup")
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const userCheck = await User.findOne({ where: { email: email } });
    if (userCheck) {
      res.json({ msg: "email already exist", signup: false });
    } else {

      const hashed = await bcrypt.hash(password, 10)
      const user = await User.create({
        name: name,
        email: email,
        password: hashed,
      });
      delete user.password;
      res.json({ msg: "signup Successful", signup: true, user });
    }
  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user= await User.findOne({where:{ email: email}});

    console.log(user)
    if (user){
        if (bcrypt.compare(user.password, password)) {
            res.json({msg : "login successful", login : true, user, token : getAccessToken(user.id, user.name)})
            
        }
        else{
            res.json({msg : "Enter correct password", login : false})
        }
    }
    else{
        res.json({msg : "user not found", login : false})
    }
}

function getAccessToken(id,name){
  return jwt.sign({userId: id, name: name},'secretKey')
}