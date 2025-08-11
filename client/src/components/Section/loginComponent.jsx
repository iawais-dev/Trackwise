import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authServices";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      toast.success("user is loggedIn");
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      toast.error("error in logging in")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Login</h2>
          <p className="text-sm text-white/70 mt-1">Welcome back, please login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-white/80">
          Don't have an account?{" "}
          <Link to="/register" className="underline hover:text-white">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
