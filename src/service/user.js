import axiosClient from "./api/api";

// ✅ GET
export const getUsers = async () => {
  const res = await axiosClient.get("/task");
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axiosClient.get(`/users/${id}`);
  return res.data;
};
