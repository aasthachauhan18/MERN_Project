import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Registration Successful!
        </h1>
        <p className="mt-2 text-gray-600">
          Redirecting to login...
        </p>
      </div>
    </div>
  );
};

export default RegisterSuccess;