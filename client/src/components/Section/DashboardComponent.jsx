import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, me } from '../../services/authServices';

const DashboardComp = () => {
  const [username, setUserName] = useState('');
  const [userId, setUserId] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await me();
        setUserName(res.data.username);
        setUserId(res.data._id)
      } catch { /* username stays empty on failure */ }
    };
    fetchName();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch { /* navigate already happened or will be retried */ }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl space-y-12">

        {/* Welcome Message */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, <span className="capitalize text-orange-500">{username}</span>
          </h1>
          <p className="text-gray-500 text-sm">Manage your skills, profile, and track progress easily.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/skills">
            <div className="h-40 bg-white border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-400 transition duration-300 flex flex-col space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">Your Skills</h2>
              <p className="text-sm text-gray-500">View and manage all your tracked skills.</p>
            </div>
          </Link>

          <Link to={`/user/${userId}`}>
            <div className="h-40 bg-white border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-400 transition duration-300 flex flex-col space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
              <p className="text-sm text-gray-500">Update your account details and preferences.</p>
            </div>
          </Link>

          <div
            onClick={handleLogout}
            className="h-40 cursor-pointer bg-white border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-300 transition duration-300 flex flex-col space-y-3"
          >
            <h2 className="text-xl font-semibold text-red-500">Logout</h2>
            <p className="text-sm text-gray-500">Securely log out of your dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
