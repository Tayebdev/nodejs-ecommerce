module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection("Product", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [
            "title",
            "description",
            "quantity",
            "sold",
            "price",
            "priceAfterDiscount",
            "colors",
            "category",
            "subCategory",
            "brand",
            "ratingAverage",
            "ratingQuantity",
          ],
          properties: {
            title: {
              bsonType: "string",
              description: "Product title is required",
              minLength: 3,
              maxLength: 100,
            },
            description: {
              bsonType: "string",
              description: "Product description is required",
              minLength: 3,
              maxLength: 500,
            },
            quantity: {
              bsonType: "int",
              description: "Product quantity is required",
            },
            sold: {
              bsonType: "int",
              description: "Number of products sold",
            },
            slug: {
              bsonType: "string",
              description: "Slug must be a string",
            },
            price: {
              bsonType: "number",
              description: "Product price is required",
            },
            priceAfterDiscount: {
              bsonType: "number",
              description: "Discounted price (if applicable)",
            },
            colors: {
              bsonType: "array",
              description: "Colors should be an array of strings",
              items: {
                bsonType: "string",
              },
            },
            imageCover: {
              bsonType: "string",
              description: "Product image cover is required",
            },
            image: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            category: {
              bsonType: "objectId",
              description: "Must reference a Category",
            },
            subCategory: {
              bsonType: "objectId",
              description: "Must reference a SubCategory",
            },
            brand: {
              bsonType: "objectId",
              description: "Must reference a Brand",
            },
            ratingAverage: {
              bsonType: "number",
              description: "Average rating of product",
              minimum: 1.0,
              maximum: 5.0,
            },
            ratingQuantity: {
              bsonType: "int",
              description: "Number of ratings",
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
    await db.collection("Product").drop();
  },
};
