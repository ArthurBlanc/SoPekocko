const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

// Routes 1/8 //
router.post("/signup", userCtrl.signup);

// Routes 2/8 //
router.post("/login", userCtrl.login);

module.exports = router;
