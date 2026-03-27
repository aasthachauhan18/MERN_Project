import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong";
    return Promise.reject({ message });
  }
);

export default api;