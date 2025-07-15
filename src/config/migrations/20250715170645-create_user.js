module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection("User", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: {
              bsonType: "string",
              description: "User name is required",
              minLength: 3,
            },
            email: {
              bsonType: "string",
              description: "User email is required",
              // NOTE: uniqueness must be enforced via index (not here)
            },
            password: {
              bsonType: "string",
              description: "User password is required",
              minLength: 8,
            },
            phone: {
              bsonType: "string",
              description: "Phone number (optional)",
            },
            role: {
              bsonType: "string",
              enum: ["user", "admin"],
              description: "User role is required",
            },
            profileImg: {
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
    await db.collection("User").drop();
  },
};
