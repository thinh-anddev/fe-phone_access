import axios from "axios";

const updateProduct = async (product: any) => {
    try {
        const listImg = product.images.map((item: any) => {
            return item.url;
        })

        const listPhoneCatIds = product.productPhoneCategories.map((item: any) => {
            return item.phoneCategory.id
        })
        console.log(product);
        
        
        const productUpdate = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
            sold: product.sold,
            createAt: product.createAt,
            images: listImg,
            categoryId: product.category.id,
            status: product.status,
            phoneCategoryIds: listPhoneCatIds,
        }
        console.log(productUpdate);
        
           
        const response = await axios.put(`${import.meta.env.VITE_API_END_POINT}/products/${product.id}`, productUpdate);
        console.log(response);
        
        return response.data;
      } catch (error) {
        console.error('Error updating product:', error);
        throw error;
      }
}

export default updateProduct;