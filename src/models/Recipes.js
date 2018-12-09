const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a recipe name'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

recipeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
  // TODO Make more resiliant so slugs are unique
});

module.exports = mongoose.model('Recipes', recipeSchema);
