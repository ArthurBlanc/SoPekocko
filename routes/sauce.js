// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "auth" middleware - Authentication middleware
const auth = require("../middleware/auth");
// Import "multer" middleware - Use for images files management
const multer = require("../middleware/multer-config");
// Import "sauce" controller
const sauceCtrl = require("../controllers/sauce");
// Create a router with "express"
const router = express.Router();

// Routes 3/8 GET - Get all the sauces
router.get("/", auth, sauceCtrl.getAllSauces);
// Routes 4/8 GET - Get one sauce
router.get("/:id", auth, sauceCtrl.getOneSauce);
// Routes 5/8 POST - Create one sauce
router.post("/", auth, multer, sauceCtrl.createSauce);
// Routes 6/8 PUT - Modify one sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
// Routes 7/8 DELETE - Delete one sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce);
// Routes 8/8 POST - Like/Dislike Management
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
