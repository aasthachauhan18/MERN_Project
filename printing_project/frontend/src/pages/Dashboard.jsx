import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() =>{
    const token = localStorage.getItem("token");

    if(!token){
      navigate("/");
    }
  },[]);

 

  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white min-h-screen p-5">

        <h2 className="text-xl font-bold mb-6 text-indigo-400">
          Print SaaS
        </h2>

        <p className="mb-4 text-gray-300">Dashboard</p>

      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Navbar */}
        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-6">

          <h1 className="text-lg font-semibold">
            Super Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-indigo-600">
            <h3>Total Users</h3>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
            <h3>Orders</h3>
            <p className="text-2xl font-bold mt-2">80</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
            <h3>Revenue</h3>
            <p className="text-2xl font-bold mt-2">₹50,000</p>
          </div>

        </div>

      </div>

    </div>
  );
}