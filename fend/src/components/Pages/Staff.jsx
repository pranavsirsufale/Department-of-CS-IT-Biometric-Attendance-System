import React, { useState, useEffect } from 'react';
import { UserCircle, Users, Plus, Trash2, Loader2, Mail, Phone, Building2, ShieldCheck, ShieldAlert } from 'lucide-react';

const Staff = () => {
  const [teachers, setTeachers] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Forms
  const [teacherForm, setTeacherForm] = useState({
    username: '', // This should be the User ID from your auth system
    password: '',
    staffType: '',
    name: '',
    email: '',
    mobile: '',
    department: '',
    isAdmin: false
  });
  const [staffTypeForm, setStaffTypeForm] = useState({ staffType: '' });

  const API_BASE = 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [teachRes, typeRes, deptRes] = await Promise.all([
        fetch(`${API_BASE}/teacher/`),
        fetch(`${API_BASE}/staff-type/`),
        fetch(`${API_BASE}/department/`)
      ]);
      setTeachers(await teachRes.json());
      setStaffTypes(await typeRes.json());
      setDepartments(await deptRes.json());
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaffType = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/staff-type/`, {
      method: 'POST',
      // access_token : localStorage.getItem("accessToken"),
      // refresh_token: localStorage.getItem("refreshToken"),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staffTypeForm),
    });
    setStaffTypeForm({ staffType: '' });
    fetchData();
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    console.log(teacherForm)
    await fetch(`${API_BASE}/teacher/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherForm),
    });
    setTeacherForm({ username: '', password: '', staffType: '', name: '', email: '', mobile: '', department: '', isAdmin: false });
    fetchData();
  };

  const deleteItem = async (endpoint, id) => {
    if (window.confirm("Are you sure you want to remove this record?")) {
      await fetch(`${API_BASE}/${endpoint}/${id}/`, { method: 'DELETE' });
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-slate-800 p-3 rounded-2xl shadow-lg text-white">
            <Users size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Staff Directory</h1>
            <p className="text-slate-500 font-medium">Manage faculty members, roles, and administrative privileges</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FORMS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* 1. Register Staff Type */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-500">
                <Plus size={16} /> 1. New Staff Type
              </h2>
              <form onSubmit={handleAddStaffType} className="space-y-3">
                <input
                  type="text"
                  placeholder="e.g. Professor, HOD"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-400"
                  value={staffTypeForm.staffType}
                  onChange={(e) => setStaffTypeForm({ staffType: e.target.value })}
                  required
                />
                <button className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl transition hover:bg-slate-900 text-sm">
                  Add Role
                </button>
              </form>
            </div>

            {/* 2. Register Teacher */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-emerald-600">
                <UserCircle size={16} /> 2. Faculty Profile
              </h2>
              <form onSubmit={handleAddTeacher} className="space-y-3">

                <select className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none font-medium"
                  value={teacherForm.department} onChange={(e) => setTeacherForm({...teacherForm, department: e.target.value})} required>
                  <option value="">Department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>

                <select className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none font-medium"
                  value={teacherForm.staffType} onChange={(e) => setTeacherForm({...teacherForm, staffType: e.target.value})} required>
                  <option value="">Select Role</option>
                  {staffTypes.map(t => <option key={t.id} value={t.id}>{t.staffType}</option>)}
                </select>

                <input type="text" placeholder="Username" className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none" 
                  value={teacherForm.username} onChange={(e) => setTeacherForm({...teacherForm, username: e.target.value})} required />

                <input type="text" placeholder="Password" className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none" 
                  value={teacherForm.password} onChange={(e) => setTeacherForm({...teacherForm, password: e.target.value})} required />
                
                <input type="text" placeholder="Full Name" className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none" 
                  value={teacherForm.name} onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})} required />
                
                <input type="email" placeholder="Email Address" className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none" 
                  value={teacherForm.email} onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})} required />
                
                <input type="text" placeholder="Mobile No." className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none" 
                  value={teacherForm.mobile} onChange={(e) => setTeacherForm({...teacherForm, mobile: e.target.value})} required />

                <div className="flex items-center gap-2 px-1 py-2">
                  <input type="checkbox" className="w-4 h-4 rounded text-emerald-600" 
                    checked={teacherForm.isAdmin} onChange={(e) => setTeacherForm({...teacherForm, isAdmin: e.target.checked})} />
                  <span className="text-xs font-bold text-slate-600">Administrative Privileges</span>
                </div>

                <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl transition hover:bg-emerald-700 shadow-lg shadow-emerald-50 text-sm">
                  Register Staff
                </button>
              </form>
            </div>
          </div>

          {/* TEACHER LISTING */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-400 w-10 h-10" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachers.map((teacher) => (
                  <div key={teacher.username} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    {teacher.isAdmin && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-tighter flex items-center gap-1">
                        <ShieldCheck size={10} /> Admin
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                        <UserCircle size={32} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{teacher.name}</h3>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-0.5">
                          {staffTypes.find(t => t.id === teacher.staffType)?.staffType || 'Faculty'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-slate-50 pt-4">
                      <div className="flex items-center gap-3 text-slate-500 text-xs">
                        <Building2 size={14} className="text-slate-300" />
                        <span className="font-medium truncate">{departments.find(d => d.id === teacher.department)?.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-xs">
                        <Mail size={14} className="text-slate-300" />
                        <span className="font-medium">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-xs">
                        <Phone size={14} className="text-slate-300" />
                        <span className="font-medium">{teacher.mobile}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => deleteItem('teacher', teacher.username)}
                      className="absolute bottom-4 right-4 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {!loading && teachers.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <Users className="mx-auto w-12 h-12 text-slate-200 mb-2" />
                <p className="text-slate-400 font-medium">No faculty members registered yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Staff;