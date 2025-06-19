import axios from "axios";
import { getAuthHeader } from "@/api/Order.ts";
import i18n from "i18next";

const updateInfo = async (id: number, username: string, phone: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/update`;
        const res = await axios.put(url, {
            id,
            phone,
            userName: username
        }, {
            headers: getAuthHeader()
        });
        return {
            message: i18n.t("update_info_success"),
            data: res.data.data
        };
    } catch (error) {
        console.log(error);
        return {
            message: i18n.t("update_info_failed")
        };
    }
};

export default updateInfo;
