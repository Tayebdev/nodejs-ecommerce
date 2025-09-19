module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection("Address", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [
            "userId",
            "name",
            "phone",
            "street",
            "postalCode",
            "city",
            "state",
            "country"
          ],
          properties: {
            userId: {
              bsonType: "objectId",
              description: "Reference to User _id is required",
            },
            name: {
              bsonType: "string",
              description: "Name for this address is required",
              minLength: 3,
            },
            phone: {
              bsonType: "string",
              description: "Phone number is required",
              minLength: 6,
            },
            street: {
              bsonType: "string",
              description: "Street address is required",
            },
            postalCode: {
              bsonType: "string",
              description: "Postal code is required",
            },
            city: {
              bsonType: "string",
              description: "City is required",
            },
            state: {
              bsonType: "string",
              description: "State is required",
            },
            country: {
              bsonType: "string",
              description: "Country is required",
            },
            createdAt: {
              bsonType: "date",
              description: "Timestamp when the address was created",
            },
            updatedAt: {
              bsonType: "date",
              description: "Timestamp when the address was last updated",
            }
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
    await db.collection("Address").drop();
  },
};
