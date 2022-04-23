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

// Storage
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().split("T")[0] + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage: Storage, fileFilter: fileFilter });

// @route POST /submittedRecipes/submit
// @desc Save a recipe to the SubmittedRecipes database
// @access Private
router.post("/submit", upload.single("file"), async (req, res, next) => {
  try {
    let submittedRecipe;
    if (req.file) {
      submittedRecipe = new SubmittedRecipes({
        idMeal: req.body.lastId,
        postedBy: req.body.postedBy,
        strCategory: req.body.recipeCategory,
        strIngredients: JSON.parse(req.body.ingredientList),
        strInstructions: JSON.parse(req.body.instructions),
        strQuantity: JSON.parse(req.body.quantityList),
        strMeal: req.body.recipeName,
        fileName: req.file.filename,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        date: req.body.date,
      });
    } else {
      submittedRecipe = new SubmittedRecipes({
        idMeal: req.body.lastId,
        postedBy: req.body.postedBy,
        strCategory: req.body.recipeCategory,
        strIngredients: JSON.parse(req.body.ingredientList),
        strInstructions: JSON.parse(req.body.instructions),
        strQuantity: JSON.parse(req.body.quantityList),
        strMeal: req.body.recipeName,
        date: req.body.date,
      });
    }
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
