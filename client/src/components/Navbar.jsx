import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { me, logoutUser } from '../services/authServices';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    me().then(res => setUser(res.data)).catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      navigate('/');
    }
  };

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`text-sm font-medium transition-colors ${
        location.pathname === path
          ? 'text-orange-500'
          : 'text-gray-400 hover:text-gray-900'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link to="/dashboard" className="text-lg font-bold text-gray-900 tracking-tight">
          Track<span className="text-orange-500">Wise</span>
        </Link>

        <div className="flex items-center gap-6">
          {navLink('/dashboard', 'Dashboard')}
          {navLink('/skills', 'Skills')}
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <Link to={`/user/${user._id}`} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {user.username[0].toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm text-gray-500 group-hover:text-gray-900 transition-colors capitalize">
                {user.username}
              </span>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
