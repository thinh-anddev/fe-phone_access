import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_END_POINT}/customers/login`,
      {
        email: email,
        password: password,
      }
    );
    if (response.data.status == "ok") {
      const data = response.data.data;
      sessionStorage.setItem("user", JSON.stringify(data.customer));
      localStorage.setItem("token", data.token);
      return { success: true, user: data.customer };
    } else if (response.data.status == "inactive") {
      return { success: false, message: "Your account is inactive" };
    }
    else {
      console.log(response.data);

      return { success: false, message: "Wrong username or password" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
