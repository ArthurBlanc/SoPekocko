// Import "multer" package - Middleware for handling `multipart/form-data` (Use for images files management)
const multer = require("multer");

// Images extensions
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		// Use "images" folder as destination for images files
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		// Remove space from original file name
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		// create unique file name by adding a timestamp
		callback(null, name + Date.now() + "." + extension);
	},
});

module.exports = multer({ storage: storage }).single("image");
