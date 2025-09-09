function calculateDiscountedPrice(price, sold) {
  if (typeof price !== "number" || typeof sold !== "number") {
    throw new Error("Price and sold must be numbers");
  }
  if (sold < 0 || sold > 100) {
    throw new Error("Discount (sold) must be between 0 and 100");
  }

  return price - (price * sold) / 100;
}

module.exports = calculateDiscountedPrice;
