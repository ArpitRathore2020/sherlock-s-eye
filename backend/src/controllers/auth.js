const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendMail = require("../utils/mailSender");
const randomStringGenerator = require("../utils/randomString");

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if all fields are provided
    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isEmailVerified == false) {
        await User.findByIdAndDelete({ _id: existingUser.id });
      } else
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
    }

    // hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Generate random string
    const randomString = randomStringGenerator(5);

    // Send Email to user
    await sendMail(
      email,
      "Email",
      `<h1>Welcome ${name}<h1/><p> Code is ${randomString}`
    );

    // create new user entry
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      code: randomString,
    })
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "User creation success",
        });
      })
      .catch(() => {
        return res.status(401).json({
          success: false,
          message: "FAILED. User not created",
        });
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const payload = {
      id: user._id,
    };

    // create jwt token for the user with 30 days of access
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      };

      res.cookie("jwt", token, options);

      return res.status(200).json({
        success: true,
        user,
        jwt_token: token,
        message: "User logged in successfully",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Email or password is incorrect",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};

// Verify Email
exports.verification = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email not registered",
      });
    }

    // console.log(user);
    // console.log(`${user.code} <> ${code}`);
    if (user.code == code) {
      await User.updateOne({ email }, { isEmailVerified: true });
      return res.status(200).json({
        success: true,
        message: "Email verified",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Error occurred while verifying Email",
      });
    }
  } catch (err) {
    console.log("EMAIL NOT VERIFIED");
    return res.status(401).json({
      success: false,
      message: "Error occurred while verifying Email",
    });
  }
};
