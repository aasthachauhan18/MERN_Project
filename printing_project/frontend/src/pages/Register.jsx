import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Name is required";

    if (!form.email.trim()) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email";
    }

    if (!form.password) {
      err.password = "Password required";
    } else if (form.password.length < 6) {
      err.password = "Minimum 6 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await dispatch(registerUser(form));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/register-success");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
      
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Create Account
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Join us and start your journey 
      </p>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-600 px-3 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* NAME */}
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      {/* LOGIN LINK */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <span
          className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  </div>
);
};

export default Register;