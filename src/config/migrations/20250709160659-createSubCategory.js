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
          required: ["name", "category"],
          properties: {
            name: {
              bsonType: "string",
              description: "SubCategory name is required",
            },
            slug: {
              bsonType: "string",
              description: "Slug must be a string",
            },
            category: {
              bsonType: "objectId",
              description: "Must be a reference to Category",
            },
            image: {
              bsonType: "string",
              description: "SubCategory image URL (optional)",
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
