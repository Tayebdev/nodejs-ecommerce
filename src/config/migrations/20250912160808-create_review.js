module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection("Review", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["product", "user", "rating"],
          properties: {
            product: {
              bsonType: "objectId",
              description: "Reference to the reviewed product (required)",
            },
            user: {
              bsonType: "objectId",
              description:
                "Reference to the user who wrote the review (required)",
            },
            rating: {
              bsonType: "double",
              minimum: 1,
              maximum: 5,
              description: "Rating between 1 and 5 (required)",
            },
            review: {
              bsonType: "string",
              description: "Customer feedback text",
            },
            responseReview: {
              bsonType: "string",
              description: "Seller/admin response to review",
            },
            dateResponseReview: {
              bsonType: "date",
              description: "Date when response was created",
            },
            createdAt: {
              bsonType: "date",
              description: "Auto timestamp when review was inserted",
            },
            updatedAt: {
              bsonType: "date",
              description: "Auto timestamp when review was last updated",
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
    await db.collection("Review").drop();
  },
};
