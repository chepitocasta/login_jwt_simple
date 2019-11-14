const jwt = require("jsonwebtoken");

const validarToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      message: "Credenciales incorrectas"
    });
  }
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  req.userId = decoded.id;
  next();
};

module.exports = validarToken;
