import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import Buttons from "../../utils/Buttons";
import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMyContext } from "../../store/ContextApi";
import { useEffect } from "react";

const Signup = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);
  // Access the token and setToken function using the useMyContext hook from the ContextProvider
  const { token } = useMyContext();
  const navigate = useNavigate();

  //react hook form initialization
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    setRole("ROLE_USER");
  }, []);

  const onSubmitHandler = async (data) => {
    const { username, email, password } = data;
    const sendData = {
      username,
      email,
      password,
      role: [role],
    };

    try {
      setLoading(true);
      const response = await api.post("/auth/public/signup", sendData);
      toast.success("Reagister Successful");
      reset();
      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      // Add an error programmatically by using the setError function provided by react-hook-form
      //setError(keyword,message) => keyword means the name of the field where I want to show the error

      if (
        error?.response?.data?.message === "Error: Username is already taken!"
      ) {
        setError("username", { message: "username is already taken" });
      } else if (
        error?.response?.data?.message === "Error: Email is already in use!"
      ) {
        setError("email", { message: "Email is already in use" });
      }
    } finally {
      setLoading(false);
    }
  };

  //if there is token  exist navigate to the user to the home page if he tried to access the login page
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-vault-500/5 rounded-full blur-3xl pointer-events-none" />

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="sm:w-[450px] w-[360px] glass-card py-6 sm:px-8 px-4 relative z-10 animate-fade-in"
      >
        <div>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-vault-gradient flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg font-outfit">R</span>
            </div>
          </div>
          <h1 className="font-outfit text-center font-bold text-2xl text-surface-100">
            Create Account
          </h1>
          <p className="text-surface-400 text-center text-sm mt-1">
            Join RookVault and secure your notes
          </p>
          <div className="flex items-center justify-between gap-2 py-5">
            <a
              href={`${apiUrl}/oauth2/authorization/google`}
              className="flex gap-2 items-center justify-center flex-1 glass-input p-2.5 rounded-lg hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
            >
              <span>
                <FcGoogle className="text-xl" />
              </span>
              <span className="font-medium sm:text-customText text-xs text-surface-300">
                Google
              </span>
            </a>
            <a
              href={`${apiUrl}/oauth2/authorization/github`}
              className="flex gap-2 items-center justify-center flex-1 glass-input p-2.5 rounded-lg hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
            >
              <span>
                <FaGithub className="text-xl text-surface-300" />
              </span>
              <span className="font-medium sm:text-customText text-xs text-surface-300">
                GitHub
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-white/[0.08]"></div>
            <span className="text-surface-500 text-xs font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/[0.08]"></div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="*UserName is required"
            placeholder="type your username"
            register={register}
            errors={errors}
          />{" "}
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="type your email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="type your password"
            register={register}
            errors={errors}
            min={6}
          />
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="vault-btn font-semibold flex justify-center text-white w-full py-2.5 my-4"
          type="text"
        >
          {loading ? <span>Loading...</span> : "Create Account"}
        </Buttons>

        <p className="text-center text-sm text-surface-400 mt-2">
          Already have an account?{" "}
          <Link
            className="font-semibold text-vault-400 hover:text-vault-300 transition-colors duration-200"
            to="/login"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
