// Import Sauce model
const Sauce = require("../models/Sauce");
// Import "FS" package - File management
const fs = require("fs");
// Import "xss-filters" package - Just sufficient output filtering to prevent XSS!
const xssFilters = require("xss-filters");

// Routes 3/8 GET - Get all the sauces
exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ error }));
};

// Routes 4/8 GET - Get one sauce
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ error }));
};

// Routes 5/8 POST - Create one sauce
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(xssFilters.inHTMLData(req.body.sauce)); // Request format in JSON
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Votre sauce a été ajoutée !" }))
		.catch((error) => res.status(400).json({ error }));
};

// Routes 6/8 PUT - Modify one sauce
exports.modifySauce = (req, res, next) => {
	// Check if the modification contains an image
	const sauceObject = req.file
		? {
				...JSON.parse(xssFilters.inHTMLData(req.body.sauce)), // Request format in JSON
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		  }
		: { ...req.body };
	// If the modification contains an image remove old image
	if (req.file != null) {
		Sauce.findOne({ _id: req.params.id }).then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlinkSync(`images/${filename}`);
		});
	}
	Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
		.then((sauce) => res.status(200).json({ message: "Votre sauce a été modifiée !" }))
		.catch((error) => res.status(400).json({ error }));
};

// Routes 7/8 DELETE - Delete one sauce
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			// Delete the image file
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Votre sauce a été supprimée !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

// Routes 8/8 POST - Like/Dislike Management
exports.likeSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			function likesAndDislikes(inc, pushOrPull, pushOrPullValue, message) {
				var likesAndDislikesObject = { _id: req.params.id, $inc: inc };
				if (pushOrPull === "push") {
					likesAndDislikesObject.$push = pushOrPullValue;
				}
				if (pushOrPull === "pull") {
					likesAndDislikesObject.$pull = pushOrPullValue;
				}
				Sauce.updateOne({ _id: req.params.id }, likesAndDislikesObject)
					.then(() => res.status(201).json({ message: message }))
					.catch((error) => res.status(400).json({ error }));
			}
			switch (req.body.like) {
				// Like case
				case 1:
					// Check if usersLiked does not contain userId
					if (!sauce.usersLiked.includes(req.body.userId)) {
						likesAndDislikes({ likes: 1 }, "push", { usersLiked: req.body.userId }, "Votre 'J'aime' a été ajouté !");
					}
					break;
				// Dislike case
				case -1:
					// Check if usersDisliked does not contain userId
					if (!sauce.usersDisliked.includes(req.body.userId)) {
						likesAndDislikes({ dislikes: 1 }, "push", { usersDisliked: req.body.userId }, "Votre 'Je n'aime pas' a été ajouté !");
					}
					break;
				// Cancel Like/Dislike case
				case 0:
					// Check if usersLiked contain userId
					if (sauce.usersLiked.includes(req.body.userId)) {
						likesAndDislikes({ likes: -1 }, "pull", { usersLiked: req.body.userId }, "Annulation de votre 'J'aime' !");
						// Check if usersDisliked contain userId
					} else if (sauce.usersDisliked.includes(req.body.userId)) {
						likesAndDislikes({ dislikes: -1 }, "pull", { usersDisliked: req.body.userId }, "Annulation de votre 'Je n'aime pas' !");
					}
					break;
			}
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};
