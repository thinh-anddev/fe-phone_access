import axios from "axios";
import { getAuthHeader } from "@/api/Order.ts";
import i18n from "i18next";

const getAddressById = async (userId: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/getAddressByCustomerId/${userId}`;
        const res = await axios.get(url, {
            headers: getAuthHeader()
        });
        return { message: i18n.t("fetch_address_success"), data: res.data.data };
    } catch (error) {
        console.log(error);
        return { message: i18n.t("fetch_address_failed") };
    }
};

export default getAddressById;
