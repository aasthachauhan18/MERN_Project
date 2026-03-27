import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { token } = useSelector((state) => state.auth);

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}