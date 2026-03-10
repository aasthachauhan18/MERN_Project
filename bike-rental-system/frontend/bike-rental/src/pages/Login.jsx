import { useState } from "react";
import API from "../services/api";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));

      alert("Login Successful");

    }catch(err){

      alert("Login Failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen">

      <div className="bg-white shadow-lg p-8 rounded w-80">

        <h2 className="text-2xl font-bold mb-4">Login</h2>

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
          onClick={handleLogin}
          className="bg-yellow-400 w-full p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;