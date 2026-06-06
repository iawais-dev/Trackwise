import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authServices.js";
import { toast } from "react-toastify";
import {useForm} from 'react-hook-form'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signupUser(data);
      toast.success("user created");
      navigate("/dashboard");
    } catch {
      toast.error("user not created")
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-8 max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Username</label>
            <input
              type="text"
              {...register("username",{required:"username is required"})}
              placeholder="yourname"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email",{required:"email is required"})}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password",{required:"password is required"})}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="text-orange-500 hover:text-orange-600 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
