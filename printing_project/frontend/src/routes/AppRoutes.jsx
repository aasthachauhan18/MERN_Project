import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { ROLES } from "../utils/constant";
import RoleRoute from "./RoleRoute";

// EXISTING
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const RegisterSuccess = lazy(() => import("../pages/RegisterSuccess"));
const UserDashboard = lazy(() => import("../modules/user/dashboard/Dashboard"));
const AdminDashboard = lazy(() =>
  import("../modules/admin/dashboard/Dashboard")
);

// NEW
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Users = lazy(() => import("../modules/admin/users/Users"));
const Branches = lazy(() => import("../modules/admin/branches/Branches"));
const MenuPage = lazy(() => import("../modules/admin/menu/MenuPage"));

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  const hasAccess = (path) => {
    console.log("hasAccess",user);
    console.log("user?.menuAccess?",user?.menuAccess);
    
    return user?.menuAccess?.some((m) => m.path === `/admin/${path}`);
  };
  // console.log(":hasAccess",hasAccess());
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-success" element={<RegisterSuccess />} />

        {/* Normal User */}
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* Admin Side Roles */}
        <Route
          element={
            <RoleRoute
              allowedRoles={[
                ROLES.SUPER_ADMIN,
                ROLES.COMPANY_ADMIN,
                ROLES.SALES,
                ROLES.PRODUCTION_MANAGER,
                ROLES.OPERATOR,
                ROLES.ACCOUNTANT,
              ]}
            />
          }
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route
              path="users"
              element={
                hasAccess("users") ? (
                  <Users />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />
            
            <Route
              path="company"
              element={
                hasAccess("company") ? (
                  <Branches />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />

            <Route
              path="menu"
              element={
                hasAccess("menu") ? (
                  <MenuPage />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;