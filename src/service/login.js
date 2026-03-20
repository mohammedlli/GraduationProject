import axiosClient from "../api";

export const login = async (data) => {
  const res = await axiosClient.post("/login", {
    email: data.email,
    password: data.password,
  });

  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("id", user.id);

  return res.data;
};
