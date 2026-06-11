import React, { useState } from "react";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import InputField from "../InputField/InputField";
import Buttons from "../../utils/Buttons";
import { Divider } from "@mui/material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMyContext } from "../../store/ContextApi";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Access the token  using the useMyContext hook from the ContextProvider
  const { token } = useMyContext();

  //react hook form initialization
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

  const onPasswordForgotHandler = async (data) => {
    //destructuring email from the data object
    const { email } = data;

    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("email", email);
      await api.post("/auth/public/forgot-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //reset the field by using reset() function provided by react hook form after submit
      reset();

      //showing success message
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error("Error sending password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //if there is token  exist navigate  the user to the home page if he tried to access the login page
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-vault-500/5 rounded-full blur-3xl pointer-events-none" />
      <form
        onSubmit={handleSubmit(onPasswordForgotHandler)}
        className="sm:w-[450px] w-[360px] glass-card py-8 sm:px-8 px-4 relative z-10 animate-fade-in"
      >
        <div>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-surface-800 border border-white/[0.1] flex items-center justify-center">
              <span className="text-2xl">🔑</span>
            </div>
          </div>
          <h1 className="font-outfit text-center font-bold text-2xl text-surface-100">
            Forgot Password?
          </h1>
          <p className="text-surface-400 text-center text-sm mt-1">
            Enter your email and we'll send a reset link
          </p>
        </div>
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/[0.08]"></div>
          <div className="w-2 h-2 rounded-full bg-vault-500/50"></div>
          <div className="flex-1 h-px bg-white/[0.08]"></div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="enter your email"
            register={register}
            errors={errors}
          />{" "}
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="vault-btn font-semibold text-white w-full py-2.5 my-4"
          type="text"
        >
          {loading ? <span>Loading...</span> : "Send Reset Link"}
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

export default ForgotPassword;
