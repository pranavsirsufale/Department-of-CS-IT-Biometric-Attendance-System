import React, { useState, useEffect } from 'react';
import { Award, Plus, Pencil, Trash2, Loader2, GraduationCap } from 'lucide-react';

const AcademicLevel = () => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ academiclevel: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://127.0.0.1:8000/api/v1/academic-level/';

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setLevels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
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
        setFormData({ academiclevel: '' });
        setEditingId(null);
        fetchLevels();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this academic level? This may affect degree classifications.")) {
      await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      fetchLevels();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-violet-600 p-3 rounded-xl shadow-lg shadow-violet-100">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Academic Levels</h1>
              <p className="text-slate-500 text-sm">Define qualification tiers and degree types</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-3xl font-bold text-slate-200">{levels.length}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Tiers</p>
          </div>
        </div>

        {/* Action Bar / Form */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-grow">
              <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Level (e.g. Undergraduate, PhD)"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition"
                value={formData.academiclevel}
                onChange={(e) => setFormData({ ...formData, academiclevel: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-violet-100"
            >
              {editingId ? <Pencil size={18} /> : <Plus size={18} />}
              <span className="hidden sm:inline">{editingId ? 'Update' : 'Add Level'}</span>
            </button>
          </form>
        </div>

        {/* Levels Grid */}
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-violet-600 w-8 h-8" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {levels.map((level) => (
              <div 
                key={level.id} 
                className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between group hover:border-violet-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-400 group-hover:scale-150 transition-transform" />
                  <span className="font-semibold text-slate-700">{level.academiclevel}</span>
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { setEditingId(level.id); setFormData({academiclevel: level.academiclevel}); }}
                    className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(level.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && levels.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Award className="mx-auto w-12 h-12 text-slate-200 mb-2" />
            <p className="text-slate-400">No academic levels defined yet.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AcademicLevel;