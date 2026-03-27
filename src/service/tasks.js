import axiosClient from "./api/api";

// ✅ GET
export const getTasks = async () => {
  const res = await axiosClient.get("/task");
  return res.data;
};

export const getTasksById = async (id) => {
  const res = await axiosClient.get(`/task/${id}`);
  return res.data;
};

export const getTasksByDoctorID = async (id) => {
  const res = await axiosClient.get(`/task/user/${id}`);
  return res.data;
};

// ✅ POST
export const createTask = async (data) => {
  const res = await axiosClient.post("/task", data);
  return res.data;
};
