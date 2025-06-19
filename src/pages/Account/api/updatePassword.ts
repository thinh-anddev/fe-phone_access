import axios from "axios";
import { getAuthHeader } from "@/api/Order.ts";
import i18n from "i18next";

const updatePassword = async (id: number, password: string, newPassword: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/updatePassword`;
        const res = await axios.put(url, {
            id,
            password,
            newPassword,
        }, {
            headers: getAuthHeader()
        });

        if (res.data.status === "failed") {
            return { message: i18n.t("old_password_incorrect") };
        }

        return { message: i18n.t("update_password_success") };
    } catch (error) {
        console.log(error);
        return { message: i18n.t("update_password_failed") };
    }
};

export default updatePassword;
