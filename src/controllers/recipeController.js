exports.recipes = (req, res) => {
  console.log('Hey man!');
  res.send('It works!');
}

exports.addRecipe = (req, res) => {
  res.send('It works');
}

exports.createRecipe = (req,res) => {
  res.json(req.body);
}