import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authServices.js";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser({ username, email, password });
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="yourname"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            />
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
