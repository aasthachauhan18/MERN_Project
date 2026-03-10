import { useState } from "react";
import API from "../services/api";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration Successful");

    } catch (err) {

      alert("Registration Failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen">

      <div className="bg-white shadow-lg p-8 rounded w-80">

        <h2 className="text-2xl font-bold mb-4">
          Register
        </h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-yellow-400 w-full p-2 rounded"
        >
          Register
        </button>

      </div>

    </div>

  );

}

export default Register;