import { getAuthHeader } from "@/api/Order";
import axios from "axios";
import i18n from 'i18next';

const deleteContact = async (id: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/contacts/${id}`;
        const res = await axios.delete(url, { headers: getAuthHeader() });
        return { success: true, message: "ok", data: res.data.data };
    } catch (error) {
        console.log(error);
        return { success: false, message: i18n.t("delete_failed"), data: null };
    }
};
export { deleteContact };