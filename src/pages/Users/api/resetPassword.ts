import axios from "axios";
import i18n from "i18next";

export const resetPassword = async (email: string, code: string, newPassword: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/forgotPassword`
        const res = await axios.post(url, {
            email,
            newPassword,
            verifyCode: code,
        });
        if(res.status == 200) {
            return {status: "ok", message: i18n.t("success_change_pass")};
        } else {
            return {status: "failed", message: i18n.t("failed_change_pass")};
        }
    } catch (error) {
        console.log(error);
        return {status: "failed", message: i18n.t("failed_change_pass")};
        
    }
}