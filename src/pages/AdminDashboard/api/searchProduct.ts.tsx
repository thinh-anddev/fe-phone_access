import axios from "axios";
import i18n from "i18next";

export const searchApi = async (name: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_END_POINT}/products/search?name=${name}`
        );

        if (response.data.status === "ok") {
            return {
                success: true,
                products: response.data.data
            };
        } else {
            return {
                success: false,
                message: i18n.t("product_not_found")
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        };
    }
};
