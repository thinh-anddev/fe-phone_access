import axios from "axios";
import { getAuthHeader } from "@/api/Order.ts";
import i18n from 'i18next';

const addAddress = async (body: any) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/insert`;
        const res = await axios.post(url,
            {
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
            },
            { headers: getAuthHeader() })
        return { message: i18n.t("insert_success"), data: res.data.data }
    } catch (error) {
        console.log(error);
        return { message: i18n.t("insert_failed") }
    }
}

export default addAddress;