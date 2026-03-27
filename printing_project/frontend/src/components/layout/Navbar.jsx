import { useDispatch } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
import { logoutUser } from "../../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <div className="h-14 bg-white shadow flex justify-between items-center px-6">
      <h1 className="font-semibold">Dashboard</h1>

      <button
        onClick={() => dispatch(logoutUser())}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}