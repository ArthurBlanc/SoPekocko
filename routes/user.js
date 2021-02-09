// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "user" controller
const userCtrl = require("../controllers/user");
// Create a router with "express"
const router = express.Router();

// Routes 1/8 POST - Sign Up
router.post("/signup", userCtrl.signup);
// Routes 2/8 POST - Login
router.post("/login", userCtrl.login);

module.exports = router;
