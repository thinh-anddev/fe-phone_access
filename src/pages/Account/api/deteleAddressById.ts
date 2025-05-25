import axios from "axios";
import {getAuthHeader} from "@/api/Order.ts";

const deleteAddressById = async (id: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/delete/${id}`
        await axios.delete(url,
            { headers: getAuthHeader() });
        return { message: "Delete address successfully." } 
    } catch (error) {
        console.log(error);
        return { message: "Fail to delete address" }
    }
}

export default deleteAddressById;