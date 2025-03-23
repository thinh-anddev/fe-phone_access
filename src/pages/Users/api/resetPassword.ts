import axios from "axios";

export const resetPassword = async (email: string, code: string, newPassword: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/forgotPassword`
        const res = await axios.post(url, {
            email,
            newPassword,
            verifyCode: code,
        });
        if(res.status == 200) {
            return {status: "ok", message: "Đổi mật khẩu thành công"};
        } else {
            return {status: "failed", message: "Cannot send email"};
        }
    } catch (error) {
        console.log(error);
        return {status: "failed", message: "Cannot send email"};
        
    }
}