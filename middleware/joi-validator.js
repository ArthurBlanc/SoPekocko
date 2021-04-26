// Import SauceFormValidator model
const SauceFormValidator = require("../models/SauceFormValidator");
// Import "FS" package - File management
const fs = require("fs");

const joiValidator = (schema) => {
	return (req, res, next) => {
		function validate(request, unlink) {
			const { error } = schema.validate(request);

			const valid = error == null;
			if (valid) {
				next();
			} else {
				const { details } = error;
				const message = details.map((i) => i.message).join(",");
				console.log("error", message);
				// Remove image send by multer if form isn't validated
				if (unlink) {
					fs.unlink(`images/${req.file.filename}`, (err) => {
						if (err) console.log(err);
					});
				}

				res.status(422).json({
					error: message,
				});
			}
		}
		// If form send new image
		if (req.body.sauce) {
			validate(JSON.parse(req.body.sauce), true);
		}
		// If form doesn't send new image
		else {
			validate(req.body, false);
		}
	};
};

module.exports = joiValidator(SauceFormValidator.sauce);
