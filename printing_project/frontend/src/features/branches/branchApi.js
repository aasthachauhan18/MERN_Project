import api from "../../services/apiClient";

export const getBranches = () => api.get("/branches");
export const addBranch = (data) => api.post("/branches", data);
export const updateBranch = (id, data) =>
  api.put(`/branches/${id}`, data);
export const deleteBranch = (id) =>
  api.delete(`/branches/${id}`);