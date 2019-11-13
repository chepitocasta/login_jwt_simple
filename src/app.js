const express = require("express");
const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//entiende los archivos json, cuando se le envia un json al servidor el es capas de convertirlo a un objeto de javascript
app.use(express.json());
//este se utiliza cuando envian datos de un formulario desde un html y lo convierte en un objeto de javascript
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/routes"));

module.exports = app;
