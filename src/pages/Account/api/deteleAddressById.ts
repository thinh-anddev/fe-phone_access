import axios from "axios";

const deleteAddressById = async (id: number) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/address/delete/${id}`
        await axios.delete(url);
        return { message: "Delete address successfully." } 
    } catch (error) {
        console.log(error);
        return { message: "Fail to delete address" }
    }
}

export default deleteAddressById;