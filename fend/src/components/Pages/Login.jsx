import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Lock, User, Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // IMPORTANT: Ensure this matches your Django server exactly
  const API_BASE = 'http://127.0.0.1:8000/api/v1';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('userData', JSON.stringify(data.user));
        window.dispatchEvent(new Event('authChange'));
        navigate('/dashboard'); 
      } else {
        setError(data.detail || data.non_field_errors || 'Invalid username or password.');
      }
    } catch (err) {
      console.error("Login Connection Error:", err);
      setError('Connection refused. Ensure CORS is enabled on Django (127.0.0.1:8000).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        
        {/* University Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-indigo-900 p-4 rounded-3xl shadow-xl mb-4 transition-transform hover:scale-105">
            <School className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">University Portal</h1>
          <p className="text-slate-500 font-medium">Academic Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-10 relative overflow-hidden transition-all">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-900" />
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800">Secure Sign In</h2>
            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Faculty & Admin Access</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Username / PRN</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Help?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  <span>Enter Portal</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Legal/Footer */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Protected by University Security Protocol &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;