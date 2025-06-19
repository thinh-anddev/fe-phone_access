import axios from "axios";
import { getAuthHeader } from "@/api/Order.ts";

export const getCarts = async () => {
  try {
    const response = await axios.get(
        `${import.meta.env.VITE_API_END_POINT}/carts`,
        { headers: getAuthHeader() }
    );

    if (response.data.status === "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "cannot_get_cart" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updateCarts = async (id: number, quantity: number) => {
  try {
    const response = await axios.put(
        `${import.meta.env.VITE_API_END_POINT}/carts/update/${id}?quantity=${quantity}`,
        {},
        { headers: getAuthHeader() }
    );

    if (response.data.status === "ok") {
      console.log(
          `${import.meta.env.VITE_API_END_POINT}/carts/update/${id}?quantity=${quantity}`
      );

      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "cannot_update_cart" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const deleteCartDetail = async (id: number) => {
  try {
    const response = await axios.delete(
        `${import.meta.env.VITE_API_END_POINT}/carts/delete/${id}`,
        { headers: getAuthHeader() }
    );

    if (response.data.status === "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "cannot_delete_cart" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const insertNewCartDetail = async (cartDetail: any) => {
  try {
    const response = await axios.post(
        `${import.meta.env.VITE_API_END_POINT}/carts/insert`,
        cartDetail,
        { headers: getAuthHeader() }
    );

    if (response.data.status === "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "cannot_insert_cart" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getTotalPrice = async (data: any) => {
  try {
    const url = `${import.meta.env.VITE_API_END_POINT}/carts/getTotalPrice`;
    const res = await axios.post(url, data, { headers: getAuthHeader() });
    return { success: true, data: res.data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
