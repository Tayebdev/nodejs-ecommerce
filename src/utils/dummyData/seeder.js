const fs = require('fs');
const path = require('path');
require('colors');
const subCategory = require('../../models/subCategory_model');
const dbConnection = require('../../config/db');
const dotenv = require('dotenv');

// ✅ Load environment variables (fixed path)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// ✅ Connect to DB
dbConnection();

// ✅ Read data file with correct absolute path
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'subCategory.json'), 'utf-8')
);

// ✅ Insert data into DB
const insertData = async () => {
  try {
    await subCategory.create(data);
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
    await subCategory.deleteMany();
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
