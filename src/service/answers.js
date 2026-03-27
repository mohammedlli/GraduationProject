import axios from "axios";
import axiosClient from "./api/api";

// ✅ GET
export const getAnswer = async () => {
  const res = await axiosClient.get("/answer");
  return res.data;
};

export const getAnswerById = async (id) => {
  const res = await axiosClient.get(`/answer/getByTask/${id}`);
  return res.data;
};

export const getAnswerAiById = async (id) => {
  const res = await axiosClient.get(
    `http://127.0.0.1:8000/api/answer/analyzeFile/${id}`,
  );
  return res.data;
};

export const getFileByAnswerId = async (id) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/answer/file/${id}`);
  return res.data;
};

// ✅ POST
export const createAnswer = async (data) => {
  const res = await axiosClient.post("/answer", data);
  return res.data;
};
