const jwt = require("jsonwebtoken");
const config = require("../config");

const validarToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "Sin autenticacion de token"
    });
  }

  const decoded = jwt.verify(token, config.secret);
  req.userId = decoded.id;
  next();
};

module.exports = validarToken;
