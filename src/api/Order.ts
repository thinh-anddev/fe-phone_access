import axios from "axios";
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};
export const getAllOrders = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_END_POINT}/orders/getAll`,
      { headers: getAuthHeader() }
    );
    if (response.data.status == "ok") {
      return { success: true, orders: response.data.data };
    } else {
      return { success: false, message: "Cannot get all orders" };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const getAllYears = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_END_POINT}/orders/getAllYear`,
      { headers: getAuthHeader() }
    );
    if (response.data.status == "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "Cannot get all years" };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const getRevenueInYear = async (year: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_END_POINT}/orders/revenueByYear?year=${year}`,
      { headers: getAuthHeader() }
    );
    if (response.data.status == "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "Cannot get all years" };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const getRevenueByCategory = async (month: number, year: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_END_POINT
      }/orders/revenueByCategory?year=${year}&month=${month}`,
      { headers: getAuthHeader() }
    );
    if (response.data.status == "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "Cannot get all years" };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const getByCustomer = async (idCustomer: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_END_POINT
      }/orders/getByCustomer?customerId=${idCustomer}`,
      { headers: getAuthHeader() }
    );
    if (response.data.status == "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "Cannot get all years" };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const cancel = async (orderId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_END_POINT
      }/orders/cancelOrder?orderId=${orderId}`,
      { headers: getAuthHeader() }
    );
    if (response.data.status == "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "Cannot get all years" };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const update = async (orderId: number, status: number) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_END_POINT
      }/orders/updateStatus`,
      { id: orderId, status: status }, { headers: getAuthHeader() }
    );
    if (response.data.status == "ok") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: "Cannot get all years" };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
