const express = require("express");
const router = express.Router();
const Recipes = require("../models/Recipes");
const Users = require("../models/Users");
const auth = require("../middleware/auth");
const cors = require("cors");
require("dotenv").config();

// @route GET /recipes
// @desc Get all recipes
// @access Public
router.get("/", async (req, res) => {
  const recipes = await Recipes.find({});
  res.send(recipes);
});

// @route POST /recipes
// @desc Save a recipe to the recipes database
// @access Public
router.post("/", async (req, res) => {
  const recipeExists = await Recipes.findOne({ idMeal: req.body.idMeal });
  if (recipeExists) {
    res.status(400).send("Recipe already exists");
  } else {
    try {
      const recipe = new Recipes({
        idMeal: req.body.idMeal,
        strCategory: req.body.strCategory,
        strIngredient1: req.body.strIngredient1,
        strIngredient2: req.body.strIngredient2,
        strIngredient3: req.body.strIngredient3,
        strIngredient4: req.body.strIngredient4,
        strIngredient5: req.body.strIngredient5,
        strIngredient6: req.body.strIngredient6,
        strIngredient7: req.body.strIngredient7,
        strIngredient8: req.body.strIngredient8,
        strIngredient9: req.body.strIngredient9,
        strIngredient10: req.body.strIngredient10,
        strIngredient11: req.body.strIngredient11,
        strIngredient12: req.body.strIngredient12,
        strIngredient13: req.body.strIngredient13,
        strIngredient14: req.body.strIngredient14,
        strIngredient15: req.body.strIngredient15,
        strIngredient16: req.body.strIngredient16,
        strIngredient17: req.body.strIngredient17,
        strIngredient18: req.body.strIngredient17,
        strIngredient19: req.body.strIngredient19,
        strIngredient20: req.body.strIngredient20,
        strInstructions: req.body.strInstructions,
        strMeal: req.body.strMeal,
        strMealThumb: req.body.strMealThumb,
        strMeasure1: req.body.strMeasure1,
        strMeasure2: req.body.strMeasure2,
        strMeasure3: req.body.strMeasure3,
        strMeasure4: req.body.strMeasure4,
        strMeasure5: req.body.strMeasure5,
        strMeasure6: req.body.strMeasure6,
        strMeasure7: req.body.strMeasure7,
        strMeasure8: req.body.strMeasure8,
        strMeasure9: req.body.strMeasure9,
        strMeasure10: req.body.strMeasure10,
        strMeasure11: req.body.strMeasure11,
        strMeasure12: req.body.strMeasure12,
        strMeasure13: req.body.strMeasure13,
        strMeasure14: req.body.strMeasure14,
        strMeasure15: req.body.strMeasure15,
        strMeasure16: req.body.strMeasure16,
        strMeasure17: req.body.strMeasure17,
        strMeasure18: req.body.strMeasure18,
        strMeasure19: req.body.strMeasure19,
        strMeasure20: req.body.strMeasure20,
        strYoutube: req.body.strYoutube,
        userSubmitted: req.body.userSubmitted,
      });
      await recipe.save();
      res.send("Submitted recipe success.");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
});

// @route POST /recipes/getLastId
// @desc Get the id of the recipe with the highest id
// @access Public
router.get("/getLastId", (req, res) => {
  Recipes.findOne({})
    .sort({ idMeal: -1 })
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: err });
      }
      if (!result) {
        return res.status(200).json(0);
      }
      console.log(result.idMeal);
      res.status(200).json(result.idMeal);
    });
});

// @route POST /recipes/save
// @desc POST a recipe to the user's collections
// @access Private
router.post("/save", async (req, res) => {
  Users.findOneAndUpdate(
    { username: req.body.username },
    {
      $push: { recipes: req.body.recipes },
    },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: error });
      }
      res.status(200).json(user);
    }
  );
});

// @route DELETE /recipes/delete
// @desc DELETE a recipe from the user's collections
// @access Private
router.post("/delete", async (req, res) => {
  Users.findOneAndUpdate(
    { username: req.body.username },
    {
      $pull: { recipes: req.body.recipes },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: error });
      }
      console.log(data);
      res.status(200).json(data);
    }
  );
});

// @route GET /recipes/exists
// @desc GET confirmation on whether a recipe already exists in the user's recipes array
// @access Private
router.post("/exists", async (req, res) => {
  Users.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      console.log(err);
    }
    for (recipe of user.recipes) {
      if (recipe.idMeal === req.body.recipes.idMeal) {
        return res
          .status(400)
          .json({ message: "Recipe already exist in the user's collections." });
      }
    }
    res.status(200).json("doesNotExist");
  });
});

module.exports = router;
