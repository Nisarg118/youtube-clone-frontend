import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 px-4 py-3 border rounded-full hover:bg-blue-100 mr-5"
      >
        <FaUserCircle className="text-2xl text-blue-500" />
        <span className="text-sm font-medium text-blue-600">Sign in</span>
      </button>
    </div>
  );
};

export default Signin;
