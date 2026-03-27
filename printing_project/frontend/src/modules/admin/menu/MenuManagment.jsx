import { useEffect, useState } from "react";
import api from "../../../services/apiClient";

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    name: "",
    key: "",
    path: "",
  });

  // 🔥 GET MENUS
  const fetchMenus = async () => {
    const res = await api.get("/menus");
    setMenus(res.data);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 ADD MENU
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/menus", form);
    setForm({ name: "", key: "", path: "" });
    fetchMenus();
  };

  // 🔥 DELETE MENU
  const handleDelete = async (id) => {
    await api.delete(`/menus/${id}`);
    fetchMenus();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Menu Management</h2>

      {/* ➕ ADD MENU */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Menu Name"
          className="border p-2"
        />
        <input
          name="key"
          value={form.key}
          onChange={handleChange}
          placeholder="Key (users)"
          className="border p-2"
        />
        <input
          name="path"
          value={form.path}
          onChange={handleChange}
          placeholder="/admin/users"
          className="border p-2"
        />
        <button className="bg-blue-500 text-white px-4">
          Add
        </button>
      </form>

      {/* 📋 MENU LIST */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Key</th>
            <th>Path</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu._id} className="text-center border-t">
              <td>{menu.name}</td>
              <td>{menu.key}</td>
              <td>{menu.path}</td>
              <td>
                <button
                  onClick={() => handleDelete(menu._id)}
                  className="bg-red-500 text-white px-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;