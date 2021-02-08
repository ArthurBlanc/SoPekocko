const Sauce = require("../models/Sauce");

const fs = require("fs");
// Just sufficient output filtering to prevent XSS!
var xssFilters = require("xss-filters");

// Routes 3/8 //
exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ error }));
};

// Routes 4/8 //
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ error }));
};

// Routes 5/8 //
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(xssFilters.inHTMLData(req.body.sauce));
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Votre sauce a été ajoutée !" }))
		.catch((error) => res.status(400).json({ error }));
};

// Routes 6/8 //
exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file
		? {
				...JSON.parse(xssFilters.inHTMLData(req.body.sauce)),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		  }
		: { ...req.body };
	Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
		.then((sauce) => res.status(200).json({ message: "Votre sauce a été modifiée !" }))
		.catch((error) => res.status(400).json({ error }));
};

// Routes 7/8 //
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Votre sauce a été supprimée !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

// Routes 8/8 //
exports.likeSauce = (req, res, next) => {
	Sauce.findOne({
		_id: req.params.id,
	})
		.then((sauce) => {
			switch (req.body.like) {
				case 1:
					if (!sauce.usersLiked.includes(req.body.userId)) {
						Sauce.updateOne(
							{ _id: req.params.id },
							{
								_id: req.params.id,
								$inc: { likes: 1 },
								$push: { usersLiked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Votre 'J'aime' a été ajouté !" }))
							.catch((error) => res.status(400).json({ error }));
					}
					break;
				case -1:
					if (!sauce.usersDisliked.includes(req.body.userId)) {
						Sauce.updateOne(
							{ _id: req.params.id },
							{
								_id: req.params.id,
								$inc: { dislikes: 1 },
								$push: { usersDisliked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Votre 'Je n'aime pas' a été ajouté !" }))
							.catch((error) => res.status(400).json({ error }));
					}
					break;
				case 0:
					if (sauce.usersLiked.includes(req.body.userId)) {
						Sauce.updateOne(
							{ _id: req.params.id },
							{
								_id: req.params.id,
								$inc: { likes: -1 },
								$pull: { usersLiked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Annulation de votre 'J'aime' !" }))
							.catch((error) => res.status(400).json({ error }));
					} else {
						Sauce.updateOne(
							{ _id: req.params.id },
							{
								_id: req.params.id,
								$inc: { dislikes: -1 },
								$pull: { usersDisliked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Annulation de votre 'Je n'aime pas' !" }))
							.catch((error) => res.status(400).json({ error }));
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
