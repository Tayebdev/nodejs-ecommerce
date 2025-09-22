module.exports = {
  /**
   * @param db
   * @param client
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection("Cart", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["user", "cartItems"],
          properties: {
            cartItems: {
              bsonType: "array",
              description: "Cart must contain an array of items",
              items: {
                bsonType: "object",
                required: ["product", "quantity", "price"],
                properties: {
                  product: {
                    bsonType: "objectId",
                    description: "Reference to Product _id is required",
                  },
                  quantity: {
                    bsonType: ["int", "double"],
                    minimum: 1,
                    description: "Quantity must be at least 1",
                  },
                  color: {
                    bsonType: "string",
                    description: "Optional color for the product",
                  },
                  nameBrand: {
                    bsonType: "string",
                    description: "Brand Name is required",
                  },
                  size: {
                    bsonType: "string",
                    description: "Optional size for the product",
                  },
                  price: {
                    bsonType: ["int", "double"],
                    minimum: 0,
                    description: "Price of the product is required",
                  },
                  priceAfterDiscount: {
                    bsonType: ["int", "double"],
                    minimum: 0,
                  },
                },
              },
            },
            totalCartPrice: {
              bsonType: ["int", "double"],
              description: "Total price of the cart before discount",
            },
            totalPriceAfterDiscount: {
              bsonType: ["int", "double"],
              description: "Total price after applying discount",
            },
            user: {
              bsonType: "objectId",
              description: "Reference to User _id is required",
            },
            createdAt: {
              bsonType: "date",
              description: "Timestamp when the cart was created",
            },
            updatedAt: {
              bsonType: "date",
              description: "Timestamp when the cart was last updated",
            },
          },
        },
      },
    });
  },

  /**
   * @param db
   * @param client
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection("Cart").drop();
  },
};
