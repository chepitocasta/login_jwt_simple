const app = require("./app");
require("./database");

//iniciar servidor
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado en puerto: ", app.get("port"));
});
