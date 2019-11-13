const UserMdl = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

//REGISTRO DE USUARIOS
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const user = new UserMdl({
    username,
    email,
    password
  });

  user.password = await user.claveEncriptada(user.password);
  await user.save();
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24
  });
  res.json({ user, auth: true, token });
};

//LOGIN DE USUARIOS
const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserMdl.findOne({ email });
  if (!user) {
    return res.status(404).send("usuario no existe");
  }

  const validPassword = await user.validarClave(password);
  if (!validPassword) {
    return res.status(401).json({ user, auth: true, token });
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24
  });

  res.json({ auth: true, token });
};

module.exports = {
  signUp,
  signIn
};
