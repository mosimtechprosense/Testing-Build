export const extractPrices = (text) => {
    if (!text) return { veg: null, nonVeg: null };

    // VEG PRICE (vegetarian, veg, veg menu)
    const vegMatch = text.match(
        /(veg(?:etarian)?)[^0-9]{0,20}(\d{2,5})/i
    );

    // NON VEG PRICE (non veg, non-veg, nonveg)
    const nonVegMatch = text.match(
        /(non[\s-]?veg)[^0-9]{0,20}(\d{2,5})/i
    );

    return {
        veg: vegMatch ? Number(vegMatch[2]) : null,
        nonVeg: nonVegMatch ? Number(nonVegMatch[2]) : null
    };
};