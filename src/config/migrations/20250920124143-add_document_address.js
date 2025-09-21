module.exports = {
  async up(db, client) {
    await db
      .collection("Address")
      .updateMany(
        { isSelected: { $exists: false } },
        { $set: { isSelected: false } }
      );
  },

  async down(db, client) {
    await db
      .collection("Address")
      .updateMany({}, { $unset: { isSelected: "" } });
  },
};
