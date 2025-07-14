const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); // if running from src

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.BD_URI);
        console.log('✅ Database connected successfully');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;