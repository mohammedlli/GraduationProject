import axiosClient from "./api/api";

export const getAllStages = async () => {
  const res = await axiosClient.get("/stage");
  return res?.data;
};
