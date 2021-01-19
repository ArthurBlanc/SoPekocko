const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/sauce");

// Routes 3/8 //
router.get("/", auth, sauceCtrl.getAllSauces);
// Routes 4/8 //
router.get("/:id", auth, sauceCtrl.getOneSauce);
// Routes 5/8 //
router.post("/", auth, multer, sauceCtrl.createSauce);
// Routes 6/8 //
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
// Routes 7/8 //
router.delete("/:id", auth, sauceCtrl.deleteSauce);
// Routes 8/8 //

module.exports = router;
