const User = require("../models/userModel");

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
      const user = await User.create({
        name: name,
        email: email,
        password: password,
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
        if (user.password===password) {
            res.json({msg : "login successful", login : true, user})
        }
        else{
            res.json({msg : "Enter correct password", login : false})
        }
    }
    else{
        res.json({msg : "user not found", login : false})
    }
}