import axios from "axios";

// interface Contact {
//     id: number;
//     fullName: string;
//     email: string;
//     content: string;
//     createdAt: string;
// }
const addContact = async (body: { fullName: string; email: string; content: string }) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/contacts`;
        const res = await axios.post(
            url,
            {
                fullName: body.fullName,
                email: body.email,
                content: body.content,
            },
        );
        if (res.data.status === "ok") {
            return { message: "Gửi liên hệ thành công", data: res.data };
        } else {
            return { message: "Gửi liên hệ thất bại", data: res.data.data };
        }

    } catch (error) {
        console.log(error);
        return { message: "Gửi liên hệ thất bại" };
    }
};

export default addContact;
