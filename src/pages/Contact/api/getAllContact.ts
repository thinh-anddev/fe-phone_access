import { getAuthHeader } from "@/api/Order";
import axios from "axios";
import i18n from "i18next";

const getAllContacts = async (sort: "asc" | "desc" = "desc") => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/contacts/getAll?sort=${sort}`;
        const res = await axios.get(url, { headers: getAuthHeader() });
        return { success: true, message: i18n.t("fetch_success"), data: res.data.data };
    } catch (error) {
        console.log(error);
        return { success: false, message: i18n.t("fetch_failed"), data: [] };
    }
};

export default getAllContacts;