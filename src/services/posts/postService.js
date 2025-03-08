import axiosInstance from "@/services/axiosInstance";

const getPostsRequest = async () => {
  try {
    const response = await axiosInstance.get("/posts/get-posts");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

export { getPostsRequest };
