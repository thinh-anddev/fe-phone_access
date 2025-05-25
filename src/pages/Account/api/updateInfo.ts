import axios from "axios";
import {getAuthHeader} from "@/api/Order.ts";

const updateInfo = async (id: number, username: string, phone: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/update`
        const res = await axios.put(url, {
            id,
            phone,
            userName: username
        },
            { headers: getAuthHeader() })
        return { message: "Update info successfully", data: res.data.data };
    } catch (error) {
        console.log(error);
        return { message: "Fail to update infomation"};
    }
}

export default updateInfo;