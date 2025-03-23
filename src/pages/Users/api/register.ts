import axios from "axios";

export const regitser = async (userName: string, email: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/sendVerificationEmail?email=${email}&name=${userName}`
        const res = await axios.get(url);
        if(res.status == 200) {
            return {status: "ok", message: "Send email successfully"};
        } else {
            return {status: "failed", message: "Cannot send email"};
        }
    } catch (error) {
        console.log(error);
        return {status: "failed", message: "Cannot send email"};
        
    }
}