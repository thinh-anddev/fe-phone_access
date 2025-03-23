import axios from "axios"

export const sendNewPassWord = async (email: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/sendVerificationEmail?email=${email}&name=""`;
        const res = await axios.get(url);
        if(res.status == 200) {
            return { success: true, message: "Ok", data: res.data };
        } else {
            return { success: false, message: "Email not found" };
        }
    } catch (error) {
     return { success: false, message: "Email not found" };
    }
}