module.exports = {
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
            "category",
            "subCategory",
            "brand",
            "ratingAverage",
            "quantityResidents",
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
              minLength: 20,
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
            price: {
              bsonType: "number",
              description: "Product price is required",
            },
            priceAfterDiscount: {
              bsonType: "number",
              description: "Discounted price (if applicable)",
            },
            images: {
              bsonType: "array",
              description: "List of images with colors",
              items: {
                bsonType: "object",
                required: ["color", "image"],
                properties: {
                  color: { bsonType: "string" },
                  image: { bsonType: "string" },
                },
              },
            },
            sizes: {
              bsonType: "array",
              description: "Available sizes (as strings)",
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
            quantityResidents: {
              bsonType: "int",
              description: "Number of residents (total ratings count)",
            },
          },
        },
      },
    });
  },

  async down(db, client) {
    await db.collection("Product").drop();
  },
};
