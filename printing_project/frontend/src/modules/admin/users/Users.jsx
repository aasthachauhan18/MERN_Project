import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../../features/users/userSlice";
import { addUser, updateUser } from "../../../features/users/userApi";
import api from "../../../services/apiClient";
// import usePermission from "../../../hooks/usePermission";
import { getMenuApi } from "../../../features/menu/menuApi";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  
  const [menus, setMenus] = useState([]);
const [selectedMenus, setSelectedMenus] = useState([]);
  // ✅ MOVE HERE

useEffect(() => {
  getMenuApi().then((res) => setMenus(res.data));
}, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = async () => {
  try {
    const payload = {
      ...form,
      menuAccess: selectedMenus, // 🔥 ADD THIS
    };

    if (editId) {
      await updateUser(editId, payload);
    } else {
      await addUser(payload);
    }

    setForm({ name: "", email: "", password: "", role: "user" });
    setSelectedMenus([]); // 🔥 RESET
    setEditId(null);
    dispatch(getUsers());
  } catch (err) {
    console.log(err);
  }
};

  // const canAdd = usePermission("add_user");
  // const canDelete = usePermission("delete_user");
  // const canEdit = usePermission("edit_user");
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">
          {editId ? "Update User" : "Add User"}
        </h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 mr-2"
        />

        <input
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 mr-2"
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">Client</option>
          <option value="superadmin">Super Admin</option>
          <option value="companyadmin">Company Admin</option>
          <option value="sales">Sales</option>
          <option value="productionmanager">Production Manager</option>
          <option value="operator">Operator</option>
          <option value="accountant">Accountant</option>
        </select>

        {/* 🔥 MENU ACCESS */}
<div className="mt-3">
  <p className="font-medium mb-1">Menu Access</p>

  <div className="flex flex-wrap gap-3">
   {menus.map((m) => (
  <label key={m._id}>
    <input
      type="checkbox"
      checked={selectedMenus.includes(m._id)}
      onChange={() => {
        setSelectedMenus((prev) =>
          prev.includes(m._id)
            ? prev.filter((id) => id !== m._id)
            : [...prev, m._id]
        );
      }}
    />
    {m.name}
  </label>
))}
    
  </div>
</div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>

        {/* {(editId ? canEdit : canAdd) && (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
        )} */}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center border-t">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  onClick={() => {
                    console.log("EDIT CLICKED:", u); // 🔍 debug

                    setEditId(u._id);
                    setForm({
                      name: u.name || "",
                      email: u.email || "",
                      password: "",
                      role: u.role || "user",
                    });
                    setSelectedMenus(u.menuAccess || []);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                {/* {canEdit && (
                  <button
                    onClick={() => {
                      console.log("EDIT CLICKED:", u);

                      setEditId(u._id);

                      setForm({
                        name: u.name || "",
                        email: u.email || "",
                        password: "",
                        role: u.role || "user",
                      });
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                )} */}

                <button
                  onClick={() => dispatch(deleteUser(u._id))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

                {/* {canDelete && (
                  <button
                    onClick={() => dispatch(deleteUser(u._id))}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
