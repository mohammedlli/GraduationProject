import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
import axiosClient from "../service/api/api";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/run-code", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
