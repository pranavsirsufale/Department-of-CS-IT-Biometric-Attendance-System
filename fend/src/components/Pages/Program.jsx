import React, { useState, useEffect } from 'react';
import { Briefcase, Building2, Clock, Plus, Pencil, Trash2, Loader2, GraduationCap, ChevronRight } from 'lucide-react';

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({ 
    name: '', 
    duration: '', 
    academiclevel: '', 
    department: '' 
  });

  const API_BASE = 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      // Fetching all dependencies in parallel for better performance
      const [progRes, deptRes, levRes] = await Promise.all([
        fetch(`${API_BASE}/program/`),
        fetch(`${API_BASE}/department/`),
        fetch(`${API_BASE}/academic-level/`)
      ]);
      
      const progs = await progRes.json();
      const depts = await deptRes.json();
      const levs = await levRes.json();

      setPrograms(Array.isArray(progs) ? progs : []);
      setDepartments(Array.isArray(depts) ? depts : []);
      setLevels(Array.isArray(levs) ? levs : []);
    } catch (error) {
      console.error("Critical Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE}/program/${editingId}/` : `${API_BASE}/program/`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', duration: '', academiclevel: '', department: '' });
        setEditingId(null);
        fetchInitialData();
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this program? This will impact all associated student records.")) {
      await fetch(`${API_BASE}/program/${id}/`, { method: 'DELETE' });
      fetchInitialData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="bg-rose-600 p-4 rounded-2xl shadow-xl shadow-rose-100 ring-4 ring-rose-50">
              <Briefcase className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Academic Catalog</h1>
              <p className="text-slate-500 font-medium">Manage degree structures and program durations</p>
            </div>
          </div>
          
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 flex gap-8 shadow-sm">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Programs</p>
              <p className="text-xl font-bold text-rose-600">{programs.length}</p>
            </div>
            <div className="w-px h-10 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Depts</p>
              <p className="text-xl font-bold text-slate-700">{departments.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Registration Form */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-10">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                {editingId ? "Update Program" : "Create New Program"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. M.S. Cybersecurity"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 outline-none transition"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Duration (Years)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 text-slate-400" size={16} />
                    <input
                      type="number"
                      placeholder="Years"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-100 outline-none"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Level</label>
                  <select
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-100 outline-none appearance-none cursor-pointer"
                    value={formData.academiclevel}
                    onChange={(e) => setFormData({...formData, academiclevel: e.target.value})}
                    required
                  >
                    <option value="">Select Level...</option>
                    {levels.map(l => <option key={l.id} value={l.id}>{l.academiclevel}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Department</label>
                  <select
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-100 outline-none appearance-none cursor-pointer"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Select Dept...</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-[0.97] flex items-center justify-center gap-2 mt-4"
                >
                  {editingId ? <Pencil size={18} /> : <Plus size={18} />}
                  {editingId ? 'Apply Changes' : 'Register Program'}
                </button>
              </form>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="xl:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-4">
                <Loader2 className="animate-spin text-rose-600 w-12 h-12" />
                <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Syncing Academic Catalog</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {programs.map((prog) => {
                  const dept = departments.find(d => d.id === prog.department);
                  const level = levels.find(l => l.id === prog.academiclevel);
                  
                  return (
                    <div key={prog.id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-2xl hover:border-rose-300 transition-all duration-300 group relative">
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                             <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-rose-100">
                              {level?.academiclevel || 'Tier 1'}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                              <Clock size={12} /> {prog.duration}Y
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-slate-800 leading-tight group-hover:text-rose-600 transition-colors">
                            {prog.name}
                          </h3>
                        </div>
                        
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => { setEditingId(prog.id); setFormData(prog); }}
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(prog.id)}
                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-rose-50 transition-colors">
                            <Building2 size={18} className="text-slate-400 group-hover:text-rose-400" />
                          </div>
                          <div className="flex flex-col leading-tight">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Department</span>
                            <span className="text-sm font-bold text-slate-700">{dept?.name || 'Academic Dept'}</span>
                          </div>
                        </div>
                        <ChevronRight className="text-slate-200 group-hover:text-rose-200 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program;