const express = require("express");
const router = express.Router();

// userController
const { register, login, checkUser } = require("../controller/userController");

//authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// register route
router.post("/register", register);

// login user
router.post("/login", login);

// check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
