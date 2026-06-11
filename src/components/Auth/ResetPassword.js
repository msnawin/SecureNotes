import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import { Divider } from "@mui/material";
import InputField from "../InputField/InputField";
import toast from "react-hot-toast";
import Buttons from "../../utils/Buttons";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const handleResetPassword = async (data) => {
    const { password } = data;

    const token = searchParams.get("token");

    setLoading(true);
    try {
      const formData = new URLSearchParams();

      formData.append("token", token);
      formData.append("newPassword", password);
      await api.post("/auth/public/reset-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("Password reset successful! You can now log in.");
      reset();
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-vault-500/5 rounded-full blur-3xl pointer-events-none" />
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="sm:w-[450px] w-[360px] glass-card py-8 sm:px-8 px-4 relative z-10 animate-fade-in"
      >
        <div>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-surface-800 border border-white/[0.1] flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
          </div>
          <h1 className="font-outfit text-center font-bold text-2xl text-surface-100">
            Update Your Password
          </h1>
          <p className="text-surface-400 text-center text-sm mt-1">
            Enter your new password to update it
          </p>
        </div>
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/[0.08]"></div>
          <div className="w-2 h-2 rounded-full bg-vault-500/50"></div>
          <div className="flex-1 h-px bg-white/[0.08]"></div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="enter your Password"
            register={register}
            errors={errors}
            min={6}
          />{" "}
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="vault-btn font-semibold text-white w-full py-2.5 my-4"
          type="text"
        >
          {loading ? <span>Loading...</span> : "Reset Password"}
        </Buttons>
        <p className="text-sm text-surface-400">
          <Link className="underline hover:text-vault-400 transition-colors duration-200" to="/login">
            Back To Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
