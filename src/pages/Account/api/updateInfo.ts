import axios from "axios";

const updateInfo = async (id: number, username: string, phone: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/update`
        const res = await axios.put(url, {
            id,
            phone,
            userName: username
        })
        return { message: "Update info successfully", data: res.data.data };
    } catch (error) {
        console.log(error);
        return { message: "Fail to update infomation"};
    }
}

export default updateInfo;