// Avoids typescript from making the modules global
export {};

const User = require('../models/user');
const { generateAccessToken } = require('../middlewares/authentication');

exports.signup = async (req: any, res: any) => {
  try{
    console.log('POST body: ', req.body);
    const newUser = await new User({
      username: req.body.username,
      password: req.body.password,
    });
    await newUser.save();

    const token = await generateAccessToken({ username: req.body.username });
    res.status(200).json(token)
  }
  catch(err) {
    if(User.exists({username: req.body.username})) {
      res.status(400).json({ msg: 'This username is already taken.', err });
    } else {
      res.status(400).json({ msg: 'Failed Signup', err });
    }
  }
};