import axios from "axios";
import {getAuthHeader} from "@/api/Order.ts";

const getLinkVNPay =  async (point: number, listId: any, fee: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/payment/create_payment?point=${point}&transportFee=${fee}`
        const res = await axios.post(url, listId,
            { headers: getAuthHeader() });
        return { success: true, data: res.data.data }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Fail to get link" }
        
    }
}

export default getLinkVNPay;