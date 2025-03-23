import axios from "axios";

export const verify =  async ( code: string, userName: string, email: string, password: string ) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/customers/register?verificationCode=${code}`
        const res = await axios.post(url, {
            username: userName,
            email,
            password,
        })
        if(res.data.status == "ok") {
            return {status: "ok", user: res.data.data, message: "Register successfully"}
        }
        return  {status: "fail", message: "Register failed"}
    } catch (error) {
        console.log(error);
        return  {status: "fail", message: "Register failed"}
    }
}