import axios from "axios";
import { getAuthHeader } from "@/api/Order.ts";
import i18n from "i18next";

const deleteAddressById = async (id: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/delete/${id}`;
        await axios.delete(url, {
            headers: getAuthHeader()
        });
        return { message: i18n.t("delete_address_success") };
    } catch (error) {
        console.log(error);
        return { message: i18n.t("delete_address_failed") };
    }
};

export default deleteAddressById;
