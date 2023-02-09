// Avoids typescript from making the modules global
export {};

const User = require("../models/user");
const { generateAccessToken } = require("../middlewares/authentication");
const bcrypt = require("bcrypt");

exports.signup = async (req: any, res: any) => {
  try {
    if (await User.exists({ username: req.body.username })) {
      return res.status(400).json({
        msg: "This username is already taken. Enter a different username",
      });
    }
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      Number(process.env.SALT)
    );

    const newUser = await new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();

    const token = await generateAccessToken({ username: req.body.username });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ msg: "Failed Signup", err });
  }
};

exports.login = async (req: any, res: any) => {
  try {
    if (!(await User.exists({ username: req.body.username }))) {
      return res.status(400).json({
        msg: "This username doesn't exist. Enter a different username",
      });
    }
    const user = await User.findOne({
      username: req.body.username,
    });
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = await generateAccessToken({ username: req.body.username });
      res.status(200).json(token);
    } else {
      res
        .status(400)
        .json({ msg: "Invalid password, Enter a correct password." });
    }
  } catch (err) {
    res.status(400).json({ msg: "Failed Login", err });
  }
};

exports.check_login = async (req: any, res: any) => {};
