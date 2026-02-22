import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, School, MapPin, Loader2 } from 'lucide-react';

const UniversityManager = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://127.0.0.1:8000/api/v1/university/';

  // Fetch Universities
  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUniversities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  // Handle Create or Update
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
        setFormData({ name: '', location: '' });
        setEditingId(null);
        fetchUniversities();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this institution?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchUniversities();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const startEdit = (uni) => {
    setEditingId(uni.id);
    setFormData({ name: uni.name, location: uni.location });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-indigo-900 p-3 rounded-lg">
            <School className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">University Registry</h1>
            <p className="text-slate-500">Manage academic institutions and campus locations</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">University Name</label>
              <input
                type="text"
                placeholder="e.g. BAMU University"
                className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Location</label>
              <input
                type="text"
                placeholder="e.g. Chh. Sambhajinagar"
                className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 bg-indigo-900 hover:bg-indigo-800 text-white font-medium py-2.5 rounded-md flex items-center justify-center gap-2 transition"
            >
              {editingId ? <Pencil size={18} /> : <Plus size={18} />}
              {editingId ? 'Update Institution' : 'Register University'}
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            Registered Institutions
            {loading && <Loader2 className="animate-spin text-indigo-600 w-4 h-4" />}
          </h2>

          {universities.length === 0 && !loading ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-400 text-sm">No universities registered yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {universities.map((uni) => (
                <div key={uni.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-indigo-200 transition">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <School className="text-slate-600 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{uni.name}</h3>
                      <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                        <MapPin size={14} />
                        {uni.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => startEdit(uni)}
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(uni.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityManager;