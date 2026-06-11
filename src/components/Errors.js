import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Errors = ({ message }) => {
  const navigate = useNavigate();
  const onBackHandler = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-74px)] p-4">
      <div className="text-center glass-card p-10 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <FiAlertCircle className="text-red-400" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-surface-100 mb-4 font-outfit">
          Oops! Something went wrong.
        </h2>
        <p className="text-surface-400 mb-6 font-semibold">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onBackHandler}
            className="vault-btn flex items-center px-6 py-2.5 text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Errors;
