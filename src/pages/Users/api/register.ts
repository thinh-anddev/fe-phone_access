import axios from "axios";
import i18n from "i18next";

export const regitser = async (userName: string, email: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/sendVerificationEmail?email=${email}&name=${userName}`
        const res = await axios.get(url);
        if(res.status == 200) {
            return {status: "ok", message: i18n.t("sendEmailSuccess") };
        } else {
            return {status: "failed", message: i18n.t("sendEmailFailed")};
        }
    } catch (error) {
        console.log(error);
        return {status: "failed", message: i18n.t("sendEmailFailed")};
        
    }
}