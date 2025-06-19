import axios from "axios";
import i18n from 'i18next';
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
            return { success: false, message: i18n.t("account.getAllError") };
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
            return { success: false, message: i18n.t("account.setAdminRoleError") };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const deleteUser = async (userId: number) => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_END_POINT}/customers/delete/${userId}`,
            { headers: getAuthHeader() }
        );
        if (response.data.status === "ok") {
            return { success: true };
        } else {
            return { success: false, message: i18n.t("account.deleteUserError") };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};
export const updateUserRole = async (userId: number, role: number) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_API_END_POINT}/customers/updateRole`,
            {
                id: userId,
                role: role,
            },
            {
                headers: getAuthHeader(),
            }
        );
        if (response.data.status === "ok") {
            return { success: true };
        } else {
            return { success: false, message: i18n.t("account.updateRoleError") };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const updateUserStatus = async (userId: number, status: number) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_API_END_POINT}/customers/updateStatus`,
            {
                id: userId,
                status: status,
            },
            {
                headers: getAuthHeader(),
            }
        );
        if (response.data.status === "ok") {
            return { success: true };
        } else {
            return { success: false, message: i18n.t("account.updateStatusError") };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

