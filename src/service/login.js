import axios from "axios";
import axiosClient from "../api";

export const login = async (data) => {
  const res = await axiosClient.post("/login", {
    ...data,
  });

  console.log(res.data);
};
