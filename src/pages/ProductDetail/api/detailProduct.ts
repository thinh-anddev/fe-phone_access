import axios from "axios";

export const detailProduct = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_END_POINT}/products/${id}`
    );
    if (response.data.status == "ok") {
      return { success: true, product: response.data.data };
    } else {
      return { success: false, message: "Cannot find this product" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
