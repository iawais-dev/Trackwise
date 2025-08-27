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
      const res = await signupUser(data);
      toast.success("user created");
      navigate("/dashboard");
    } catch (error) {
      console.log("err", error);
      toast.error("user not created")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-sm text-white/70 mt-1">Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-white/90 text-sm mb-1">Username</label>
            <input
              type="text"
              {...register("username",{required:"username is required"})}
              placeholder="yourname"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-white/90 text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email",{required:"email is required"})}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          </div>

          <div>
            <label className="block text-white/90 text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password",{required:"password is required"})}
              placeholder="********"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-white/80">
          Already have an account?{" "}
          <Link to="/" className="underline hover:text-white">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
