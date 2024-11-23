const getTotalPrice = (totalData, calc) => {
    const sumPrices = (items) => {
        return items.reduce((sum, item) => {
            // Check for different price-related properties
            const price =
                calc === 'fees'
                    ? item.fees
                    : calc === 'price'
                        ? item.price
                        : item.totalAmount
            return sum + price;
        }, 0);
    };

    const totalPrice = sumPrices(totalData);
    return totalPrice?.toLocaleString()
}

export default getTotalPrice