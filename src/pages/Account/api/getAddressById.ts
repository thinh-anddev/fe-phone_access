import axios from "axios";
import {getAuthHeader} from "@/api/Order.ts";

const getAddressById = async (userId: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/getAddressByCustomerId/${userId}`;
        const res = await axios.get(url,
            { headers: getAuthHeader() });
        return { message: "ok", data: res.data.data };
        
    } catch (error) {
        console.log(error);
        return { message: "fail to fetch data" }
    }
}

export default getAddressById;