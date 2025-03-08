import axiosInstance from "@/services/axiosInstance";

const getPostsRequest = async () => {
  try {
    const response = await axiosInstance.get("/posts/get-posts");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

const getPostRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/posts/get-post", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

const addPostRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/posts/add-post", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

const getPostsByIdRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/posts/get-posts-by-id", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Bir hata oluştu");
  }
};

export { getPostsRequest, getPostRequest, addPostRequest, getPostsByIdRequest };
