import axiosClient from "./api/api";

export const login = async (data) => {
  const res = await axiosClient.post("/login", {
    email: data.email,
    password: data.password,
  });

  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("id", user.id);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("role", user.role);

  return res.data;
};

export const signup = async (data) => {
  const res = await axiosClient.post("/register", data);

  return res.data;
};
