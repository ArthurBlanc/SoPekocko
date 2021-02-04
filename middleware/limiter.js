const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes window
	max: 10, // start blocking after 10 requests
	message: "Too many accounts created from this IP, please try again after 60 minutes",
});

module.exports = limiter;
