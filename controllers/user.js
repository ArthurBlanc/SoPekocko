const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv").config();
const validator = require("validator");

const User = require("../models/User");

// Routes 1/8 //
exports.signup = (req, res, next) => {
	if (!validator.isEmail(req.body.email)) {
		return res.status(401).json({ error: "Votre email est invalide !" });
	}
	if (!validator.isStrongPassword(req.body.password)) {
		return res
			.status(401)
			.json({ error: "Votre mot de passe n'est pas assez fort ! Il doit contenir au moins 8 caractères dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial." });
	}
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: CryptoJS.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_SECRET_KEY}`).toString(),
				password: hash,
			});
			user.save()
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// Routes 2/8 //
exports.login = (req, res, next) => {
	User.findOne({ email: CryptoJS.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_SECRET_KEY}`).toString() })
		.then((user) => {
			if (!user) {
				return res.status(404).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "24h" }),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
