const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/apijwtsimple", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db => console.log("Base de datos iniciada"))
  .catch(errordb => console.log("Error al conectar con base de datos"));
