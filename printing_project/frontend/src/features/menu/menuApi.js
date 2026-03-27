import api from "../../services/apiClient";

export const getMenuApi = () => api.get("/menu");
export const addMenuApi = (data) => api.post("/menu", data);
export const updateMenuApi = (id, data) =>
  api.put(`/menu/${id}`, data);
export const deleteMenuApi = (id) =>
  api.delete(`/menu/${id}`);