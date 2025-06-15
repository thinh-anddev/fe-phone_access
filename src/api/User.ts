import axios from "axios";

export const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: token ? `Bearer ${token}` : "",
    };
};

export const getAllAccounts = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_END_POINT}/customers/getAll`,
            { headers: getAuthHeader() }
        );
        if (response.data.status === "ok") {
            return { success: true, users: response.data.data };
        } else {
            return { success: false, message: "Không lấy được danh sách người dùng" };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const setAdminRole = async (userId: number) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_END_POINT}/customers/setAdmin?userId=${userId}`,
            {},
            { headers: getAuthHeader() }
        );
        if (response.data.status === "ok") {
            return { success: true };
        } else {
            return { success: false, message: "Cập nhật quyền thất bại" };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const deleteUser = async (userId: number) => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_END_POINT}/customers/delete?id=${userId}`,
            { headers: getAuthHeader() }
        );
        if (response.data.status === "ok") {
            return { success: true };
        } else {
            return { success: false, message: "Xoá người dùng thất bại" };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};
