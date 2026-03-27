import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {user?.role === "superadmin" && "Super Admin Dashboard"}
        {user?.role === "companyadmin" && "Company Admin Dashboard"}
        {user?.role === "sales" && "Sales Dashboard"}
        {user?.role === "productionmanager" && "Production Manager Dashboard"}
        {user?.role === "operator" && "Operator Dashboard"}
        {user?.role === "accountant" && "Accountant Dashboard"}
      </h1>

      {/* your same dashboard cards/UI remains same */}
    </div>
  );
};

export default Dashboard;