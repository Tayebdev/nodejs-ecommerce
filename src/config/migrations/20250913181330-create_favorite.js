module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection("Favorite", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "productId"],
          properties: {
            userId: {
              bsonType: "objectId",
              description: "Must reference a User",
            },
            productId: {
              bsonType: "objectId",
              description: "Must reference a Product",
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
    await db.collection("Favorite").drop();
  },
};
