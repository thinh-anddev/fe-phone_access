import axios from "axios";

const getAddressById = async (userId: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/getAddressByCustomerId/${userId}`;
        const res = await axios.get(url);
        return { message: "ok", data: res.data.data };
        
    } catch (error) {
        console.log(error);
        return { message: "fail to fetch data" }
    }
}

export default getAddressById;