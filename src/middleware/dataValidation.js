const yup = require("yup");

const validate = f => {
  return (req, res, next) => {
    try {
      f(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
const createUserValidation = data => {
  const schema = yup.object().shape({
    username: yup
      .string("El nombre de usuario debe ser de tipo string")
      //   .min(5, "El nombre de usuario debe ser tener minimo 5 caracteres")
      .required("El nombre de usuario es obligatorio.")
  });

  schema.validateSync(data);
};

module.exports = {
  validate,
  createUserValidation
};
