import React, { useState, useEffect } from 'react';
import { BookOpen, School, Plus, Pencil, Trash2, Loader2, Search } from 'lucide-react';

const DisciplineManager = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ discipline: '', university: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://127.0.0.1:8000/api/v1/discipline/';
  const UNI_API_URL = 'http://127.0.0.1:8000/api/v1/university/';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [disRes, uniRes] = await Promise.all([
        fetch(API_URL),
        fetch(UNI_API_URL)
      ]);
      const disData = await disRes.json();
      const uniData = await uniRes.json();
      
      setDisciplines(Array.isArray(disData) ? disData : []);
      setUniversities(Array.isArray(uniData) ? uniData : []);
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
        // setFormData((prev)=>({...prev, university: prev.university ? parseInt(prev.university) : ""}))
        // console.log(formData)
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ discipline: '', university: '' });
        setEditingId(null);
        fetchData();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this discipline? This may affect associated courses.")) {
      await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-700 p-3 rounded-xl shadow-lg shadow-emerald-100">
              <BookOpen className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Academic Disciplines</h1>
              <p className="text-slate-500 text-sm">Organize fields of study across universities</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                <h2 className="font-semibold text-slate-700">
                  {editingId ? 'Edit Discipline' : 'Add New Discipline'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">University</label>
                  <select
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition appearance-none"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    required
                  >
                    <option value="">Select Institution...</option>
                    {universities.map(uni => (
                      <option key={uni.id} value={uni.id}>{uni.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Science/Management/Humanities"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-md shadow-emerald-100 transition-all active:scale-[0.98]"
                >
                  {editingId ? <Pencil size={18} /> : <Plus size={18} />}
                  {editingId ? 'Update Field' : 'Create Discipline'}
                </button>
                
                {editingId && (
                  <button 
                    type="button"
                    onClick={() => { setEditingId(null); setFormData({discipline: '', university: ''}); }}
                    className="w-full text-slate-400 text-sm hover:text-slate-600 transition"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Loader2 className="animate-spin w-10 h-10 mb-2" />
                <p>Syncing with Registry...</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {disciplines.length > 0 ? disciplines.map((item) => (
                  <div key={item.id} className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded uppercase">Academic Field</span>
                          <h3 className="text-lg font-bold text-slate-800">{item.discipline}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <School size={15} className="text-slate-400" />
                          <span className="text-sm italic">
                            {universities.find(u => u.id === item.university)?.name || 'Unknown University'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setEditingId(item.id); setFormData({discipline: item.discipline, university: item.university}); }}
                          className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition"
                        >
                          <Pencil size={19} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                    <BookOpen className="mx-auto w-12 h-12 text-slate-200 mb-4" />
                    <p className="text-slate-500">No disciplines found. Start by adding a major or field of study.</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DisciplineManager;