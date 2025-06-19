import axios from "axios";
import { getAuthHeader } from "@/api/Order.ts";
import i18n from "i18next";

const updateAddress = async (body: any) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/update`;
        const res = await axios.put(url, {
            id: body.id,
            provinceId: body.provinceIdSelected,
            provinceValue: body.provinceValSelected,
            districtId: body.districtIdSelected,
            districtValue: body.districtValSelected,
            wardId: body.wardIdSelected,
            wardValue: body.wardValSelected,
            subAddress: body.subAddress,
            status: 1,
            customer: {
                id: body.customerId
            }
        }, {
            headers: getAuthHeader()
        });
        return {
            message: i18n.t("update_address_success"),
            data: res.data.data
        };
    } catch (error) {
        console.log(error);
        return { message: i18n.t("update_address_failed") };
    }
};

export default updateAddress;
