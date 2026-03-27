import { ROLES } from "./constant";


export const menuConfig = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    roles: [ROLES.SUPER_ADMIN], // ✅ ADD
  },
  {
    key: "users",
    label: "Users",
    path: "/admin/users",
    roles: [ROLES.SUPER_ADMIN], // ✅ ADD
  },
  {
    key: "company",
    label: "Company",
    path: "/admin/company",
    roles: [ROLES.SUPER_ADMIN], // ✅ ADD
  },
  {
    key: "menu",
    label: "Menu",
    path: "/admin/menu",
    roles: [ROLES.SUPER_ADMIN], // ✅ ADD
  },
];