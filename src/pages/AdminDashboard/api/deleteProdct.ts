import axios from "axios";

const deleteProduct = async (id: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/products/${id}`
        const res = await axios.delete(url);
        return  { success: true, message: "ok", data: res.data }
    } catch (error) {
        console.log(error);
        return { success: false, message: "fail" }
        
    }
}

export default deleteProduct;