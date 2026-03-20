import axiosClient from "../api";

export const getAllStages = async (data) => {
  const res = await axiosClient.get("/stags");

  return res;
};
