import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.email) err.email = "Email required";
    if (!form.password) err.password = "Password required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await dispatch(
      loginUser({
        email: form.email,
        password: form.password,
      })
    );

    console.log("FULL RESPONSE 👉", res);

    if (res.meta.requestStatus !== "fulfilled") {
      console.error("Login failed:", res.payload);
      return;
    }

    const role = res.payload?.user?.role;

    switch (role) {
      case "superadmin":
      case "companyadmin":
      case "sales":
      case "productionmanager":
      case "operator":
      case "accountant":
        navigate("/admin/dashboard");
        break;

      default:
        navigate("/user/dashboard");
    }
  };

  useEffect(() => {
    if (user && location.pathname === "/login") {
      switch (user.role) {
        case "superadmin":
        case "companyadmin":
        case "sales":
        case "productionmanager":
        case "operator":
        case "accountant":
          navigate("/admin/dashboard");
          break;

        default:
          navigate("/user/dashboard");
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;