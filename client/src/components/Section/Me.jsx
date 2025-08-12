import React, { useEffect, useState } from 'react';
import { me, updateUser, verifyPassword } from '../../services/authServices';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Me() {
  const { id } = useParams();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isEditable, setEditable] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [oldpassword, setOldPassword] = useState('');

  useEffect(() => {
    const userDetail = async () => {
      try {
        const res = await me();
        const data = res.data;
        setForm({
          username: data.username,
          email: data.email,
          password: '',
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    userDetail();
  }, []);

  const handleVerifyPassword = async () => {
    try {
      const res = await verifyPassword(id, oldpassword);
      if (res.data.success) {
        setIsSuccess(true);
        toast.success('password verified')
        setPasswordCheck(false);
      } else {
        setIsSuccess(false);
        toast.success('password not verified')
      }
    } catch (error) {
      console.log('Error verifying password', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(id, form);
      toast.success('Changes Updated')
      setEditable(false);
      setIsSuccess(false);
      setForm({ ...form, password: '' });
    } catch (error) {
      setMessage(error.message || 'Update failed');
      console.log('Error updating user', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 text-white">
      Loading your data...
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg space-y-6 relative">
        <h1 className="text-3xl font-bold text-white">Your Profile</h1>

        {message && (
          <p className="text-blue-400 text-sm text-center">{message}</p>
        )}

        <div className="space-y-6 pb-20">
          {/* Username */}
          <div className="relative">
            <label className="block text-sm text-white/70 mb-1">Username</label>
            <input
              type="text"
              name="username"
              disabled={!isEditable}
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => (isEditable ? handleUpdate() : setEditable(true))}
              className="absolute -bottom-10 right-0 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-lg"
            >
              {isEditable ? 'Submit' : 'Edit'}
            </button>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-white/70 mb-1">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={form.email}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              disabled={!isSuccess}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30"
            />
            <button
              onClick={() => (isSuccess ? handleUpdate() : setPasswordCheck(true))}
              className="absolute -bottom-10 right-0 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-lg"
            >
              {isSuccess ? 'Submit' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Password verification popup */}
        {passwordCheck && (
          <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-md relative space-y-4 w-full max-w-sm">
              <button
                onClick={() => setPasswordCheck(false)}
                className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8"
              >
                X
              </button>
              <label className="block text-sm text-white/70">
                Enter your current password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30"
                placeholder="Old Password"
                name="oldPassword"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                onClick={handleVerifyPassword}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Verify Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Me;
