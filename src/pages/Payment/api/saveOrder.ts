import axios from "axios";

const saveOrder = async (order: any) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/payment/payment_success`
        const res = await axios.post(url, order);
        return { success: true, data: res.data};
    } catch (error) {
        console.log();
        return { success: false, message: "Fail to save order" }
    }
}

export default saveOrder
