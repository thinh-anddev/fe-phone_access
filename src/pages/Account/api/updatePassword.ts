import axios from "axios";
import {getAuthHeader} from "@/api/Order.ts";

const updatePassword = async (id: number, password: string, newPassword: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/updatePassword`;
        const res = await axios.put(url, {
            id,
            password,
            newPassword,
        },
            { headers: getAuthHeader() })
        if(res.data.status == "failed") {
            return { message: "Old password incorrect" };
        }
        return { message: "Update password successfully" };
    } catch (error) {
        console.log(error);
        return { message: "Fail to update password" }
    }
}

export default updatePassword;