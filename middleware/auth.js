// Import "jsonwebtoken" package - Create and verify authentication tokens
const jwt = require("jsonwebtoken");
// Import "dotenv" package - Loads environment variables from .env file
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
	// Check authentication token
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable !";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Requête non authentifiée !"),
		});
	}
};
