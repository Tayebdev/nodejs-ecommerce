module.exports = {
  async up(db, client) {
    await db
      .collection("Product")
      .updateMany(
        { isFavorite: { $exists: false } },
        { $set: { isFavorite: false } }
      );
  },

  async down(db, client) {
    await db
      .collection("Product")
      .updateMany({}, { $unset: { isFavorite: "" } });
  },
};
