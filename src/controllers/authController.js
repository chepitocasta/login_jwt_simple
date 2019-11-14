const UserMdl = require("../models/User");
const jwt = require("jsonwebtoken");

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
  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24
  });
  res.json({ user, auth: true, token });
};

//LOGIN DE USUARIOS
const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserMdl.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: "Credenciales incorrectas" });
  }

  const validPassword = await user.validarClave(password);
  console.log(validPassword);
  if (!validPassword) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24
  });

  res.json({ token });
};

module.exports = {
  signUp,
  signIn
};
