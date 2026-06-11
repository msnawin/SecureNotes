import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-74px)]">
      <div className="glass-card p-8 max-w-md w-full mx-4 text-center animate-fade-in">
        <div className="text-amber-500 text-6xl mb-4 flex justify-center items-center">
          <FaExclamationTriangle />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-surface-100 font-outfit">Access Denied</h1>
        <p className="text-surface-400 mb-6">
          You do not have permission to view this page.
        </p>
        <button
          onClick={goHome}
          className="vault-btn px-6 py-2.5 text-white"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
