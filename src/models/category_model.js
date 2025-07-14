const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'category is required'],
    unique: [true,'category must be unique']
  },
  slug: {
    type: String,
    lowercase: true
  },
  image:String
}, {
  timestamps: true,
  collection: 'Category' // forces collection name to be exactly 'Category'
});

const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = CategoryModel;
