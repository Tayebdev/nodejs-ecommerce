module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection("Category", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "name_ar"],
          properties: {
            name: {
              bsonType: "string",
              description: "Category name is required",
            },
            name_ar: {
              bsonType: "string",
              description: "Category name_ar is required",
            },
            slug: { bsonType: "string" },
            image: {
              bsonType: "string",
              description: "Profile image URL (optional)",
            },
          },
        },
      },
    });
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection("Category").drop();
  },
};
