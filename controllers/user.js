// Import User model
const User = require("../models/User");
// Import "bcrypt" package - A library to help you hash passwords
const bcrypt = require("bcrypt");
// Import "jsonwebtoken" package - Create and verify authentication tokens
const jwt = require("jsonwebtoken");
// Import "crypto-js" package - JavaScript library of crypto standards
const CryptoJS = require("crypto-js");
// Import "dotenv" package - Loads environment variables from .env file
const dotenv = require("dotenv").config();
// Import "validator" package - String validation and sanitization
const validator = require("validator");

// Import key and iv form .env
const key = CryptoJS.enc.Hex.parse(`${process.env.CRYPTOJS_SECRET_KEY}`);
const iv = CryptoJS.enc.Hex.parse(`${process.env.CRYPTOJS_SECRET_IV}`);

// Routes 1/8 POST - Sign Up
exports.signup = (req, res, next) => {
	// Check if the email is valid with "validator"
	if (!validator.isEmail(req.body.email)) {
		return res.status(401).json({ error: "Votre email est invalide !" });
	}
	// Check if the password is string with "validator"
	if (!validator.isStrongPassword(req.body.password)) {
		return res
			.status(401)
			.json({ error: "Votre mot de passe n'est pas assez fort ! Il doit contenir au moins 8 caractères dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial." });
	}
	// Password encryption with "bcrypt"
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			// Create a new user
			const user = new User({
				// Email encryption (AES) with "crypto-js"
				email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString(),
				password: hash,
			});
			// Save new user in database
			user.save()
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// Routes 2/8 POST - Login
exports.login = (req, res, next) => {
	// Check if the user email (encrypted) is in the database
	User.findOne({ email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString() })
		.then((user) => {
			if (!user) {
				return res.status(404).json({ error: "Utilisateur non trouvé !" });
			}
			// Compare password hash with database
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					// Check if password is valid
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						userId: user._id,
						// Create a authentication token with "jsonwebtoken"
						token: jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "24h" }),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
