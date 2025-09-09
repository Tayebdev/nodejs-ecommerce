const fs = require('fs');
const path = require('path');
require('colors');
const product = require('../../models/product_model');
const dbConnection = require('../../config/db');
const dotenv = require('dotenv');

// ✅ Load environment variables (fixed path)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// ✅ Connect to DB
dbConnection();

// ✅ Read data file with correct absolute path
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8')
);

// ✅ Insert data into DB
const insertData = async () => {
  try {
    await product.create(data);
    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// ✅ Delete data from DB
const destroyData = async () => {
  try {
    await product.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// ✅ CLI commands: -i or -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
