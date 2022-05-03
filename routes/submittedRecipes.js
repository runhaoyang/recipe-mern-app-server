const express = require("express");
const router = express.Router();
const SubmittedRecipes = require("../models/SubmittedRecipes");
const Users = require("../models/Users");
const auth = require("../middleware/auth");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { json } = require("body-parser");
require("dotenv").config();

// @route GET /submittedRecipes
// @desc Get all recipes
// @access Public
router.get("/", async (req, res) => {
  const recipes = await SubmittedRecipes.find({});
  res.status(200).json(recipes);
});

// @route POST /submittedRecipes/submit
// @desc Save a recipe to the SubmittedRecipes database
// @access Private
router.post("/submit", async (req, res, next) => {
  try {
    const submittedRecipe = new SubmittedRecipes({
      idMeal: req.body.lastId,
      postedBy: req.body.postedBy,
      strCategory: req.body.recipeCategory,
      strIngredients: JSON.parse(req.body.ingredientList),
      strInstructions: JSON.parse(req.body.instructions),
      strQuantity: JSON.parse(req.body.quantityList),
      strMeal: req.body.recipeName,
      fileName: req.body.fileName,
      filePath: req.body.filePath,
      fileType: req.body.fileType,
      date: req.body.date,
    });
    await submittedRecipe.save();
    res.json(submittedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// @route DELETE /submittedRecipes/delete/:id
// @desc DELETE a recipe from the submittedRecipes's collections
// @access Private
router.delete("/delete/:id", async (req, res) => {
  await SubmittedRecipes.deleteOne({ idMeal: req.params.id })
    .then((recipe) => {
      console.log(recipe);
      res.status(200).json(recipe);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json(err.message);
    });
});

// @route GET /submittedRecipes/getLastId
// @desc Get the id of the recipe with the highest id
// @access Public
router.get("/getLastId", (req, res) => {
  SubmittedRecipes.findOne({})
    .sort({ idMeal: -1 })
    .exec((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err });
      }
      if (!result) {
        return res.status(200).json(0);
      }
      res.status(200).json(result.idMeal);
      console.log(result.idMeal);
    });
});

module.exports = router;
