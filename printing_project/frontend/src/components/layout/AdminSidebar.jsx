import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const { user, menuAccess } = useSelector((state) => state.auth);

  const menus =
    user?.role === "superadmin"
      ? menuAccess   // or fetch all menus separately
      : menuAccess;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {menus.map((menu) => (
        <Link
          key={menu._id}
          to={menu.path}
          className="block py-2 px-3 hover:bg-gray-200 rounded"
        >
          {menu.name}
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;