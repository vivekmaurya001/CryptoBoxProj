import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification } from "antd";

const Login = ({ toggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (obj) => {
    setLoading(true);
    const { email, password } = obj;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);

      // Trigger the notification in a non-rendering lifecycle event
      notification.success({
        message: "Verification done!",
        description: "Verified through email successfully!",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      notification.error({
        message: "Error Occurred!",
        description: err.message || "An error occurred during login.",
      });
      setLoading(false);
    }
  };

  const SigninWithGoogle = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      notification.success({
        message: "Verification done!",
        description: "Verified through email succesfuly!",
      });
      navigate("/dashboard");
      console.log("User signed in and stored:", userDoc.data());
    } catch (error) {
      notification.error({
        message: "Error Occcured!",
        description: error,
      });
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className="h-90 rounded-lg border-white border-opacity-10 border-2 p-6 max-w-lg w-full backdrop-blur-lg shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-3">
      <h2 className="text-2xl text-center mb-10 text-white font-bold">
        Login to your account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              },
            })}
            className={`peer w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-400"
            } rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent text-white mb-4 font-bold`}
            placeholder="Enter your email"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter your Email{" "}
            {errors.email && <span className="text-red-500">*</span>}
          </label>
        </div>

        <div className="relative mb-2">
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`peer w-full p-3 border ${
              errors.password ? "border-red-500" : "border-gray-400"
            } rounded-lg shadow-sm focus:border-blue-800 placeholder-transparent bg-transparent text-white mb-4 font-bold`}
            placeholder="Enter your password"
          />
          <label className="absolute left-3 -top-5 text-sm font-medium text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-white -z-10">
            Enter your Password{" "}
            {errors.password && <span className="text-red-500">*</span>}
          </label>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 text-red-500 text-sm">
            <p>
              <span className="text-red-500">*</span> This is a required field
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-800 text-white p-3 rounded-xl hover:bg-blue-950 transform duration-300 shadow-xl font-semibold"
        >
          Login
        </button>
      </form>
      <div className="mt-5 text-center text-sm">
        <p className="text-zinc-300">
          Don't have an account?
          <span
            onClick={toggleForm}
            className="text-blue-400 cursor-pointer hover:text-red-600 underline transition-colors duration-300 ml-2"
          >
            SignUp
          </span>
        </p>
      </div>
      <div className="my-4 flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="px-4 text-gray-400">or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <button
        onClick={SigninWithGoogle}
        className="w-full bg-sky-950 border border-gray-500 text-gray-100 p-2 rounded-lg hover:bg-blue-900 transform duration-300 shadow-2xl font-semibold"
      >
        <span className="flex justify-center items-center gap-2">
          <img src="images/google.svg" alt="Google Icon" />
          Continue with Google
        </span>
      </button>
    </div>
  );
};

export default Login;
