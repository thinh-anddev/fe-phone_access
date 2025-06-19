import axios from "axios";
import i18n from 'i18next';

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
            return { message: i18n.t("send_success"), data: res.data };
        } else {
            return { message: i18n.t("send_failed"), data: res.data.data };
        }
    } catch (error) {
        console.log(error);
        return { message: i18n.t("send_failed") };
    }
};

export default addContact;
