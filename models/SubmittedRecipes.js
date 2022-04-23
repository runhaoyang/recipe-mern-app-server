const mongoose = require("mongoose");

const SubmittedRecipesSchema = new mongoose.Schema({
  idMeal: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
  },
  strCategory: {
    type: String,
  },
  strIngredients: {
    type: [String],
  },
  strQuantity: {
    type: [String],
  },
  strInstructions: {
    type: [String],
  },
  strMeal: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
  fileType: {
    type: String,
  },
  date: {
    type: String,
  },
});

const SubmittedRecipes = mongoose.model(
  "SubmittedRecipes",
  SubmittedRecipesSchema
);

module.exports = SubmittedRecipes;
