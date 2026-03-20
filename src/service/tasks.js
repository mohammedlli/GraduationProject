import axiosClient from "../api";

 
// ✅ GET
export const getTasks = async () => {
  const res = await axiosClient.get("/task");
  return res.data;
};

// ✅ POST
export const createTask = async (data) => {
  const res = await axiosClient.post("/task", data);
  return res.data;
};