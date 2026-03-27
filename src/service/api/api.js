import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://graduationprojectbe-main-sqmi4s.laravel.cloud/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor (attach token)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Response interceptor (handle errors)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      console.log("Unauthorized → logout");
      // optional: redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
