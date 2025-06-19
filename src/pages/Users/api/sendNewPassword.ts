import axios from "axios"
import {getAuthHeader} from "@/api/Order.ts";
import i18n from "i18next";

export const sendNewPassWord = async (email: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/sendVerificationEmail?email=${email}&name=""`;
        const res = await axios.get(url,
            { headers: getAuthHeader() });
        if(res.status == 200) {
            return { success: true, message: "Ok", data: res.data };
        } else {
            return { success: false, message: i18n.t("emailNotFound") };
        }
    } catch (error) {
     return { success: false, message: i18n.t("emailNotFound") };
    }
}