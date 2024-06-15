const users = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phonenumber } = req.body;
    if (!name ||!email || !password || !phonenumber) {
      return res.status(403).json({
        message: "please enter all details",
      });
    } else {
      const existingUser = await users.findOne({ email: email });
      if (existingUser) {
        return res.status(403).json({
          message: "you are already registred please login ",
        });
      }

      const newUser = await users.create({
        name: name,
        email: email,
        phoneNumber: phonenumber,
        password: password,
      });
      res.status(201).json({
        message: "you have successfully registred ",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
};
