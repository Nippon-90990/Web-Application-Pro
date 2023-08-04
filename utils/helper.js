export const getDiscountedPricePercentage = (
    original_Price,
    discountedPrice
) => {
    const discount = original_Price - discountedPrice;

    const discountPercentage = (discount / original_Price) * 100;

    return discountPercentage.toFixed(2);
};
