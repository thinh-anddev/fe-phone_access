import { getAuthHeader } from "@/api/Order";
import axios from "axios";

const deleteContact = async (id: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/contacts/${id}`;
        const res = await axios.delete(url, { headers: getAuthHeader() });
        return { success: true, message: "ok", data: res.data.data };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Xóa liên hệ thất bại", data: null };
    }
};
export { deleteContact };