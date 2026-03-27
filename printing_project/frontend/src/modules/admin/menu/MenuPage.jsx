import { useEffect, useState } from "react";
import {
  getMenuApi,
  addMenuApi,
  updateMenuApi,
  deleteMenuApi,
} from "../../../features/menu/menuApi";

const rolesList = [
  "superadmin",
  "companyadmin",
  "sales",
  "productionmanager",
  "operator",
  "accountant",
  "user",
];

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    name: "",
    path: "",
    roles: [],
  });
  const [editId, setEditId] = useState(null);

  const loadMenus = async () => {
    const res = await getMenuApi();
    setMenus(res.data);
  };

  useEffect(() => {
    loadMenus();
  }, []);

  const handleRoleChange = (role) => {
    if (form.roles.includes(role)) {
      setForm({
        ...form,
        roles: form.roles.filter((r) => r !== role),
      });
    } else {
      setForm({
        ...form,
        roles: [...form.roles, role],
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        path: form.path.startsWith("/") ? form.path : `/${form.path}`,
      };

      if (editId) {
        await updateMenuApi(editId, payload);
      } else {
        await addMenuApi(payload);
      }

      setForm({ name: "", path: "", roles: [] });
      setEditId(null);
      loadMenus();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Menu Management</h2>

      <div className="bg-white p-4 shadow rounded mb-4">
        <input
          placeholder="Menu Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2"
        />

        <input
          placeholder="Path (/admin/users)"
          value={form.path}
          onChange={(e) => setForm({ ...form, path: e.target.value })}
          className="border p-2 mr-2"
        />

        <div className="mt-2">
          {rolesList.map((role) => (
            <label key={role} className="mr-3">
              <input
                type="checkbox"
                checked={form.roles.includes(role)}
                onChange={() => handleRoleChange(role)}
              />
              {role}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Path</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {menus.map((m) => (
            <tr key={m._id} className="text-center border-t">
              <td className="p-2">{m.name}</td>
              <td>{m.path}</td>
              <td>{m.roles?.join(", ") || "No Roles"}</td>
              <td>
                <button
                  onClick={() => {
                    setEditId(m._id);
                    setForm({
                      name: m.name || "",
                      path: m.path?.startsWith("/") ? m.path : `/${m.path}`,
                      roles: m.roles || [],
                    });
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMenuApi(m._id).then(loadMenus)}
                  className="bg-red-500 text-white px-2 py-1"
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
}
