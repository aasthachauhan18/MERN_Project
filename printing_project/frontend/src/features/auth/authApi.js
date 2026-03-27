import api from "../../services/apiClient";

const authApi = {
  login: async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  register: async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
};

export default authApi;