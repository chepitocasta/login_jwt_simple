if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  console.log("Bienvenido al ambiente: ", process.env.NODE_ENV);
}

const express = require("express");
const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//entiende los archivos json, cuando se le envia un json al servidor el es capas de convertirlo a un objeto de javascript
app.use(express.json());
//este se utiliza cuando envian datos de un formulario desde un html y lo convierte en un objeto de javascript
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/routes"));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(400).json({ message: error.message });
});

module.exports = app;
