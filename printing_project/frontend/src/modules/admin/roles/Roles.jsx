import { useState } from "react";
import axios from "axios";

const ALL_PERMISSIONS = [
  "view_dashboard",
  "add_user",
  "edit_user",
  "delete_user",
  "manage_branches",
  "manage_menu",
];

export default function Roles() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  const toggle = (perm) => {
    setSelected((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const handleSubmit = async () => {
    await axios.post("/api/roles", {
      name,
      permissions: selected,
    });
    alert("Role Created");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Role</h2>

      <input
        placeholder="Role Name"
        className="border p-2 mb-3"
        onChange={(e) => setName(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        {ALL_PERMISSIONS.map((p) => (
          <label key={p}>
            <input
              type="checkbox"
              onChange={() => toggle(p)}
            />
            {p}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-indigo-600 text-white px-4 py-2"
      >
        Save Role
      </button>
    </div>
  );
}