const estShippingFee = async (orderDetails: any) => {
    const response = await fetch(`${import.meta.env.VITE_API_GHN_DEV}/v2/shipping-order/fee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ShopId': '192211',
            'Token': import.meta.env.VITE_API_GHN_TOKEN,
        },
        body: JSON.stringify(orderDetails)
    });

    const data = await response.json();
    return data;  
}

export default estShippingFee;