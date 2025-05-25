import axios from 'axios';
import {getAuthHeader} from "@/api/Order.ts";

const addProduct = async (product: any, listImg: any[]) => {
    try {

        // const listImg = product.images.map((item: any) => {
        //     return item.url;
        // })

        // const listPhoneCatIds = product.productPhoneCategories.map((item: any) => {
        //     return item.phoneCategory.id
        // })
        const productInsert = {
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
            sold: product.sold,
            createAt: product.createAt,
            images: listImg,
            categoryId: product.categoryId,
            status: product.status,
            phoneCategoryIds: [8 ,10],
        }
        console.log(productInsert);

        const response = await axios.post(`${import.meta.env.VITE_API_END_POINT}/payment/payment_success`, productInsert,
            { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export default addProduct;