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
      } catch {
        setLoading(false);
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
        toast.error('password not verified')
      }
    } catch {
      toast.error('Failed to verify password');
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
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 text-gray-500">
      Loading your data...
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white border border-orange-100 p-8 rounded-2xl shadow-sm space-y-6 relative">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>

        {message && (
          <p className="text-orange-500 text-sm text-center">{message}</p>
        )}

        <div className="space-y-6 pb-20">
          {/* Username */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              disabled={!isEditable}
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-50"
            />
            <button
              onClick={() => (isEditable ? handleUpdate() : setEditable(true))}
              className="absolute -bottom-10 right-0 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 rounded-lg transition"
            >
              {isEditable ? 'Submit' : 'Edit'}
            </button>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={form.email}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              disabled={!isSuccess}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-50"
            />
            <button
              onClick={() => (isSuccess ? handleUpdate() : setPasswordCheck(true))}
              className="absolute -bottom-10 right-0 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 rounded-lg transition"
            >
              {isSuccess ? 'Submit' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Password verification popup */}
        {passwordCheck && (
          <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-lg relative space-y-4 w-full max-w-sm mx-4">
              <button
                onClick={() => setPasswordCheck(false)}
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 transition"
              >
                ✕
              </button>
              <label className="block text-sm text-gray-600">
                Enter your current password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Old Password"
                name="oldPassword"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                onClick={handleVerifyPassword}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
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
