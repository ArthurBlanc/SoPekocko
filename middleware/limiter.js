// Import "express-rate-limit" package - Basic IP rate-limiting middleware. Use to limit repeated requests to public APIs and/or endpoints (Brute force)
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes window
	max: 20, // start blocking after 20 requests
	message: "Trop de requêtes de cette adresse IP, veuillez réessayer après 60 minutes",
});

module.exports = limiter;
