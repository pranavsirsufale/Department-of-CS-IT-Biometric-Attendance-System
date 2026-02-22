import React, { useState, useEffect } from 'react';
import { Layers, BookOpen, Plus, Pencil, Trash2, Loader2, ArrowRight } from 'lucide-react';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', discipline: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://127.0.0.1:8000/api/v1/department/';
  const DIS_API_URL = 'http://127.0.0.1:8000/api/v1/discipline/';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [deptRes, disRes] = await Promise.all([
        fetch(API_URL),
        fetch(DIS_API_URL)
      ]);
      const deptData = await deptRes.json();
      const disData = await disRes.json();
      
      setDepartments(Array.isArray(deptData) ? deptData : []);
      setDisciplines(Array.isArray(disData) ? disData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', discipline: '' });
        setEditingId(null);
        fetchData();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this department? This action cannot be undone.")) {
      await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="bg-sky-600 p-3 rounded-xl shadow-lg shadow-sky-100">
            <Layers className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Department Administration</h1>
            <p className="text-slate-500 text-sm">Define specific administrative units within academic disciplines</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Form Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
              <h2 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
                {editingId ? <Pencil size={16} className="text-sky-600" /> : <Plus size={16} className="text-sky-600" />}
                {editingId ? 'Edit Dept.' : 'New Dept.'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Department Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Physics"
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition bg-slate-50/50"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Parent Discipline</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition bg-slate-50/50 appearance-none"
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    required
                  >
                    <option value="">Select Discipline...</option>
                    {disciplines.map(dis => (
                      <option key={dis.id} value={dis.id}>{dis.discipline}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg shadow-md shadow-sky-100 transition-all active:scale-[0.98]"
                >
                  {editingId ? 'Save Changes' : 'Register Department'}
                </button>
                
                {editingId && (
                  <button 
                    type="button"
                    onClick={() => { setEditingId(null); setFormData({name: '', discipline: ''}); }}
                    className="w-full text-slate-400 text-xs hover:underline"
                  >
                    Cancel Selection
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* List Display */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-sky-600 w-10 h-10" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept) => {
                  const parentDiscipline = disciplines.find(d => d.id === dept.discipline);
                  return (
                    <div key={dept.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition group">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3">
                          <div className="inline-flex items-center text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded gap-1 uppercase tracking-tighter">
                            <BookOpen size={10} />
                            {parentDiscipline?.discipline || 'Unknown Discipline'}
                            <ArrowRight size={10} />
                            Dept
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                            {dept.name}
                          </h3>
                        </div>
                        
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setEditingId(dept.id); setFormData({name: dept.name, discipline: dept.discipline}); }}
                            className="p-2 hover:bg-sky-50 text-slate-400 hover:text-sky-600 rounded-lg transition"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(dept.id)}
                            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {!loading && departments.length === 0 && (
              <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-2xl">
                <p className="text-slate-400">No departments found. Please add a department to get started.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Department;