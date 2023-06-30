const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authentication = (req, res, next) => {
  try {
    const token = req.header("Authentication");
    console.log(token);
    const user = jwt.verify(token, "secretKey");
    User.findByPk(user.userId).then((user) => {
      req.user = user;
      
      next();
    });
  } catch (error) {
    console.log("first error")
    console.log(error);
    return res.status(401).json({ success: false });
  }
};
