import axios from "axios";
import i18n from "@/i18n"; // Đảm bảo bạn đã export i18n instance từ file i18n.ts hoặc i18n.js

export const detailProduct = async (id: number) => {
  try {
    const response = await axios.get(
        `${import.meta.env.VITE_API_END_POINT}/products/${id}`
    );

    if (response.data.status === "ok") {
      return {
        success: true,
        product: response.data.data
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
      message: i18n.t("something_went_wrong") + ": " + error.message
    };
  }
};
