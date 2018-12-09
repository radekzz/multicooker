const express = require("express");
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// These are just test routes
router.get("/hello", (req, res) => {
  console.log('Hey!')
  res.send("Hello");
});
router.post('/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});


// Real routes
router.get('/recipes', recipeController.recipes);
router.get('/addrecipe', recipeController.addRecipe);
router.post('/addrecipe', recipeController.createRecipe);



module.exports = router;
