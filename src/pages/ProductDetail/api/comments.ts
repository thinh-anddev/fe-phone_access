import axios from "axios";
import { getAuthHeader } from "@/api/Order";
import i18n from "i18next";


// interface Comment {
//     id: number;
//     productId: number;
//     customerId: number;
//     username: string;
//     content: string;
//     createdAt: string;
// }

// interface PageResponse {
//     content: Comment[];
//     totalPages: number;
//     totalElements: number;
//     number: number;
//     size: number;
// }

const getCommentsByProduct = async (productId: number, page: number = 0, size: number = 5) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/comments/product/${productId}?page=${page}&size=${size}`;
        const res = await axios.get(url, { headers: getAuthHeader() });
        return { success: true, message: i18n.t("comments.fetch_success"), data: res.data.data };
    } catch (error) {
        console.log(error);
        return { success: false, message: i18n.t("comments.fetch_failed"), data: { content: [], totalPages: 0 } };
    }
};

const addComment = async (productId: number, content: string) => {
    try {
        const url = `${import.meta.env.VITE_API_END_POINT}/comments`;
        const res = await axios.post(
            url,
            { productId, content },
            { headers: getAuthHeader() }
        );
        return { success: true, message: i18n.t("comments.add_success"), data: res.data.data };
    } catch (error) {
        console.log(error);
        return { success: false, message: i18n.t("comments.add_failed"), data: null };
    }
};

export { getCommentsByProduct, addComment };