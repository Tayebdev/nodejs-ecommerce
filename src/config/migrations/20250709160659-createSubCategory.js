module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection("SubCategory", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "category", "name_ar"],
          properties: {
            name: {
              bsonType: "string",
              description: "SubCategory name is required",
            },
            name_ar: {
              bsonType: "string",
              description: "SubCategory name_ar is required",
            },
            category: {
              bsonType: "objectId",
              description: "Must be a reference to Category",
            },
          },
        },
      },
    });

    // Optional: create index for uniqueness
    await db
      .collection("SubCategory")
      .createIndex({ name: 1 }, { unique: true });
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection("SubCategory").drop();
  },
};
