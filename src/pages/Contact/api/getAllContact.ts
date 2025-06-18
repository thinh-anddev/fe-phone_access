import { getAuthHeader } from "@/api/Order";
import axios from "axios";

const getAllContacts = async (sort: "asc" | "desc" = "desc") => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/contacts/getAll?sort=${sort}`;
        const res = await axios.get(url, { headers: getAuthHeader() });
        return { success: true, message: "Lấy danh sách liên hệ thành công", data: res.data.data };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Lấy danh sách liên hệ thất bại", data: [] };
    }
};

export default getAllContacts;