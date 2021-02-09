// Import "mongoose" package - Mongoose MongoDB ODM
const mongoose = require("mongoose");
// Import "mongoose-unique-validator" package - Adds pre-save validation for unique fields within a Mongoose schema.
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
	userId: { type: String, required: false },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// Prevent multiple account creation with the same email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
