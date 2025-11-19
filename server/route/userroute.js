const express = require("express");
const {
  Signup,
  Login,
  getuser,
  logout,
} = require("../controller/usercontroller");
const authMiddleware = require("../middlware/auth");
const router = express.Router();

router.post("/auth/register", Signup);
router.post("/auth/login", Login);
router.get("/getuser", authMiddleware, getuser);
router.post("/logout", authMiddleware, logout);

module.exports = router;
