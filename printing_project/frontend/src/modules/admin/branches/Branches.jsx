import { useEffect, useState } from "react";
import {
  getBranches,
  addBranch,
  updateBranch,
  deleteBranch,
} from "../../../features/branches/branchApi";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [editId, setEditId] = useState(null);

  const loadBranches = async () => {
    const res = await getBranches();
    setBranches(res.data);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await updateBranch(editId, form);
    } else {
      await addBranch(form);
    }

    setForm({ name: "", address: "", phone: "" });
    setEditId(null);
    loadBranches();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Branches</h2>

      {/* FORM */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <input
          placeholder="Company Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 mr-2"
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="border p-2 mr-2"
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border p-2 mr-2"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {branches.map((b) => (
            <tr key={b._id} className="text-center border-t">
              <td className="p-2">{b.name}</td>
              <td>{b.address}</td>
              <td>{b.phone}</td>

              <td>
                <button
                  onClick={() => {
                    setEditId(b._id);
                    setForm({
                      name: b.name,
                      address: b.address,
                      phone: b.phone,
                    });
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBranch(b._id).then(loadBranches)}
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
};

export default Branches;