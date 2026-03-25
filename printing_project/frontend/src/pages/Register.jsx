import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name required";
    if (!form.email) err.email = "Email required";
    if (!form.password) err.password = "Password required";
    if (!form.role) err.role = "Select role";

    return err;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Register clicked");

    const res = await API.post("/auth/register", form);

    console.log("Register success", res.data);

    alert("Registered Successfully");

    navigate("/"); 

  } catch (err) {
    console.log(err);
    alert("Register failed");
  }
};
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="card" onSubmit={handleSubmit}>

        <h2 className="text-xl mb-5 text-center">Register</h2>

        <div className="input-group">
          <input placeholder=" " className="input-field"
            onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <label className="input-label">Name</label>
          <p className="error">{errors.name}</p>
        </div>

        <div className="input-group">
          <input placeholder=" " className="input-field"
            onChange={(e)=>setForm({...form,email:e.target.value})}/>
          <label className="input-label">Email</label>
          <p className="error">{errors.email}</p>
        </div>

        <div className="input-group">
          <input type="password" placeholder=" " className="input-field"
            onChange={(e)=>setForm({...form,password:e.target.value})}/>
          <label className="input-label">Password</label>
          <p className="error">{errors.password}</p>
        </div>

        <select
          className="input-field"
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option value="">Select Role</option>
          <option value="super_admin">Super Admin</option>
          <option value="company_admin">Company Admin</option>
          <option value="sales">Sales</option>
          <option value="production">Production</option>
          <option value="accountant">Accountant</option>
        </select>
        <p className="error">{errors.role}</p>

        <button className="btn">Register</button>

        <p className="text-center mt-3 text-sm">
          <Link to="/">Login</Link>
        </p>

      </form>
    </div>
  );
}