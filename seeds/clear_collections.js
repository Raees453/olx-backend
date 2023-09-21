require('dotenv').config();

const mongoose = require('mongoose');

const Category = require('../models/categoryModel');

const dbPassword = process.env.DATABASE_PASSWORD;
const dbUrl = process.env.DATABASE_URL.replace('<password>', dbPassword);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected'))
  .catch(console.error);

const clearCategories = async () => {
  return await Category.deleteMany();
};

if (process.argv[2] === '--clear') {
  console.log('Categories Deleted!');
  clearCategories();
}
