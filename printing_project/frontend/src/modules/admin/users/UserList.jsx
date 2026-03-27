import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../../features/users/userSlice";

export default function UserList() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-xl mb-4 font-semibold">Users</h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center border-t">

              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td>
                <button
                  onClick={() => dispatch(deleteUser(u._id))}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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