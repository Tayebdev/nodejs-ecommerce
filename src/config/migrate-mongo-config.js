
// In this file you can configure migrate-mongo
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
console.log('BD_URI:', process.env.BD_URI);
const config = {
  mongodb: {
    url: process.env.BD_URI || "mongodb://localhost:27017",
    databaseName: process.env.BD_NAME || "ecommrece",
    options: {}
  },
  migrationsDir: "src/config/migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 0,
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
