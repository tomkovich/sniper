const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  prepareTime: Number,
  services: Number,
  date: { type: Date, default: Date.now },
  ingredients: [{ title: String, amount: Number }],
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  steps: [{ stepNumber: Number, body: String }],
  nutritionFacts: [{ title: String, nutritionValue: String }],
  likes: {
    type: Number,
    default: 0,
  },
  photo: String,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
