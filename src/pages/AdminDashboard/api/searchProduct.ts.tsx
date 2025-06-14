import axios from "axios";

export const searchApi = async (name: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_END_POINT}/products/search?name=${name}`
        );
        if (response.data.status == "ok") {
            return { success: true, products: response.data.data };
        } else {
            return { success: false, message: "Cannot find this product" };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};
