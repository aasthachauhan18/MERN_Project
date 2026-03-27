import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RoleRoute;