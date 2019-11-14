const { Router } = require("express");
const router = Router();
const authCrt = require("../controllers/authController");
const userCrt = require("../controllers/userController");
const verificarToken = require("../middleware/verificarTokenController");

router.post("/signup", authCrt.signUp);

router.post("/signin", authCrt.signIn);

router.get("/me", verificarToken, userCrt.getUser);

module.exports = router;
