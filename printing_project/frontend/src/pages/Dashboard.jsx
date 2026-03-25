import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    const navigate = useNavigate()
  let user = null;

try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (err) {
  user = null;
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

   
    navigate("/");
  };
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      
      <div className="flex-1 p-6">

     
        <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {user?.role}
            </span>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-600">
            <h3 className="text-gray-500 text-sm">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">120</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-indigo-600">
            <h3 className="text-gray-500 text-sm">Quotations</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">80</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-orange-500">
            <h3 className="text-gray-500 text-sm">Revenue</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹50,000</p>
          </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Monthly Performance
          </h2>

          <div className="h-40 flex items-center justify-center text-gray-400">
             Chart Coming Here
          </div>
        </div>

      </div>
    </div>
  );
}