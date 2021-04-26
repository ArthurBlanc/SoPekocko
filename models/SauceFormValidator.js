// Import "joi" package - Object schema validation
const Joi = require("joi");

const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9\ \,\.\'\-\(\)\%\:]*$/;

const SauceFormValidator = {
	sauce: Joi.object().keys({
		name: Joi.string().min(3).max(128).regex(regex).required(),
		manufacturer: Joi.string().min(3).max(128).regex(regex).required(),
		description: Joi.string().min(3).max(256).regex(regex).required(),
		mainPepper: Joi.string().min(3).max(128).regex(regex).required(),
		heat: Joi.number().integer().min(1).max(10).required(),
		userId: Joi.string().required(),
	}),
};

module.exports = SauceFormValidator;
