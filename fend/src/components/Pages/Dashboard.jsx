import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, User, Building2, BadgeCheck, Calendar, 
  ArrowRight, LogOut, Users, LayoutGrid 
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 1. Fetch user data from localStorage on load
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (!savedUser) {
      // Kick back to login if no data found
      navigate('/login');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  // 2. Handle Logout via Router navigation
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Prevent rendering if user isn't loaded yet
  if (!user) return null;

  const stats = [
    { label: 'My Department', value: user?.department_name || 'N/A', icon: Building2, color: 'text-blue-600' },
    { label: 'Faculty Role', value: user?.staffType_name || 'Teacher', icon: BadgeCheck, color: 'text-emerald-600' },
    { label: 'Access Level', value: user?.isAdmin ? 'Administrator' : 'Standard', icon: ShieldCheck, color: 'text-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-900 p-1.5 rounded-lg text-white">
            <LayoutGrid size={20} />
          </div>
          <span className="font-bold text-slate-800 tracking-tight text-lg">University Console</span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold text-sm transition-colors"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-800 mb-2">Welcome, {user?.name}</h1>
            <p className="text-slate-500 font-medium">Academic profile for {user?.username}</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
            <Calendar className="text-indigo-600" size={20} />
            <span className="text-sm font-bold text-slate-700">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-8">
            <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" /> System Privileges
            </h2>
            <div className="space-y-4">
              <PrivilegeRow title="Academic Management" allowed={user?.isAdmin} desc="Admin only" />
              <PrivilegeRow title="Attendance Logging" allowed={true} desc="All Faculty" />
              <PrivilegeRow title="Student Registry" allowed={user?.isAdmin} desc="Admin only" />
            </div>
          </div>

          <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <h2 className="text-lg font-bold mb-6 opacity-80 uppercase tracking-widest text-xs">Profile Card</h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <User size={32} />
              </div>
              <div>
                <p className="text-xl font-bold leading-tight">{user?.name}</p>
                <p className="text-indigo-300 text-sm">{user?.email}</p>
              </div>
            </div>
            <button className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2">
              Edit Details <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivilegeRow = ({ title, desc, allowed }) => (
  <div className={`flex items-center justify-between p-4 rounded-2xl border ${allowed ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${allowed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
        <ShieldCheck size={20} />
      </div>
      <div>
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${allowed ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-500'}`}>
      {allowed ? 'Enabled' : 'Restricted'}
    </span>
  </div>
);

export default Dashboard;