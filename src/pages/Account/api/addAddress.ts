import axios from "axios";

const addAddress = async (body: any) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/insert`;
        const res = await axios.post(url, {
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
        })
        return { message: "Insert address successfully", data: res.data.data }
    } catch (error) {
        console.log(error);
        return { message: "Fail to add address" }
    }
}

export default addAddress;