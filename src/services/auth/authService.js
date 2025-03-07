import axiosInstance from "@/services/axiosInstance";

const registerRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

const loginRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

const logoutRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/logout", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

const meRequest = async (data) => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

export { registerRequest, loginRequest, logoutRequest, meRequest };
