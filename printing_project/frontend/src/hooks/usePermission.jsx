import { useSelector } from "react-redux";

export default function usePermission(permission) {
  const { user } = useSelector((state) => state.auth);

  const permissions = user?.permissions || [];

  return permissions.includes(permission);
}