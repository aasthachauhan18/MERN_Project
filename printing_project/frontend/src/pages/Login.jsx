import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

 
  const validate = () => {
    let err = {};

    if (!form.email) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email format";
    }

    if (!form.password) {
      err.password = "Password is required";
    } else if (form.password.length < 6) {
      err.password = "Minimum 6 characters";
    }

    return err;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Login clicked");

    const res = await API.post("/auth/login", form);

    console.log("Login success", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard"); 

  } catch (err) {
    console.log(err.response?.data);
    alert("Login failed");
  }
};
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="card" onSubmit={handleSubmit}>

        <h2 className="text-xl mb-5 text-center">Login</h2>

    
        <div className="input-group">
          <input
            type="text"
            placeholder=" "
            className="input-field"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />
          <label className="input-label">Email</label>
          <p className="error">{errors.email}</p>
        </div>

       
        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            className="input-field"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />
          <label className="input-label">Password</label>
          <p className="error">{errors.password}</p>
        </div>

        <button className="btn">Login</button>

        <p className="text-center mt-3 text-sm">
          <Link to="/register">Register</Link>
        </p>

      </form>
    </div>
  );
}