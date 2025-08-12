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
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.log('error in logout', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl space-y-12">
        
        {/* Welcome Message */}
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, <span className="capitalize text-indigo-400">{username}</span>
          </h1>
          <p className="text-slate-400 text-sm">Manage your skills, profile, and track progress easily.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
          <Link to="/skills">
            <div className="h-40 bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-indigo-400 transition duration-300 flex flex-col space-y-3">
              <h2 className="text-xl font-semibold">Your Skills</h2>
              <p className="text-sm text-slate-300">View and manage all your tracked skills.</p>
            </div>
          </Link>

          <Link to={`/user/${userId}`}>
            <div className="h-40 bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-indigo-400 transition duration-300 flex flex-col space-y-3">
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <p className="text-sm text-slate-300">Update your account details and preferences.</p>
            </div>
          </Link>

          <div
            onClick={handleLogout}
            className="h-40 cursor-pointer bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-red-400 transition duration-300 flex flex-col space-y-3"
          >
            <h2 className="text-xl font-semibold text-red-300">Logout</h2>
            <p className="text-sm text-slate-300">Securely log out of your dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
