import axios from "axios";
import {getAuthHeader} from "@/api/Order.ts";
import i18n from "i18next"

const deleteProduct = async (id: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/products/${id}`
        const res = await axios.delete(url,
            { headers: getAuthHeader() });
        return  { success: true, message: i18n.t("product_deleted_successfully"), data: res.data }
    } catch (error) {
        console.log(error);
        return { success: false, message: i18n.t("product_deleted_failed") }
        
    }
}

export default deleteProduct;