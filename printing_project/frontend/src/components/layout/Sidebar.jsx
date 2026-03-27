import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const filteredMenu = user?.menuAccess || [];
  console.log("MENU PATHS 👉", filteredMenu);

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      {/* {JSON.stringify(user)} */}
      {/* to={"/"+item.path} */}
      {filteredMenu.map((item) => (
        <>
        {/* {JSON.stringify(item)} */}
        <Link
          key={item._id}
          to={"/"+item.path}
          className="block py-2 px-3 rounded hover:bg-gray-700"
        >
          {item.name}
        </Link>
        </>
      ))}
    </div>
  );
}