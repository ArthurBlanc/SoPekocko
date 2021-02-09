// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "body-parser" package - Node.js body parsing middleware
const bodyParser = require("body-parser");
// Import "mongoose" package - Mongoose MongoDB ODM
const mongoose = require("mongoose");
// Security packages
// Import "dotenv" package - Loads environment variables from .env file
const dotenv = require("dotenv").config();
// Import "helmet" package - Helmet helps secure Express apps by setting various HTTP headers (add 11 security middlewares)
const helmet = require("helmet");
// Import "express-mongo-sanitize" package - Sanitizes user-supplied data to prevent MongoDB Operator Injection
// by searching for keys in objects that begin with $ or contain a ., from req.body, req.query or req.params and completely remove these keys and associated data
const mongoSanitize = require("express-mongo-sanitize");
// Import "limiter" middleware - Basic IP rate-limiting middleware. Use to limit repeated requests to public APIs and/or endpoints (Brute force)
const limiter = require("./middleware/limiter");

// Import "sauce" route
const sauceRoutes = require("./routes/sauce");
// Import "user" route
const userRoutes = require("./routes/user");

const path = require("path");

// MongoDB connection with "mongoose" and environment variables (dotenv)
mongoose
	.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.ucdgk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

app.use(helmet());
app.use("/api/auth", limiter);

app.use(bodyParser.json());

app.use(mongoSanitize());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
