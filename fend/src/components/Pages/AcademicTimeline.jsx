import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Pencil, Trash2, Loader2, ChevronRight, CalendarDays, GraduationCap } from 'lucide-react';

const AcademicTimeline = () => {
  const [programs, setPrograms] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [yearForm, setYearForm] = useState({ year: '' });
  const [semesterForm, setSemesterForm] = useState({ semester: '', startDate: '', endDate: '', year: '' });
  const [activeYearId, setActiveYearId] = useState(null); // To track which year we are adding a semester to

  const API_BASE = 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [progRes, yearRes, semRes] = await Promise.all([
        fetch(`${API_BASE}/program/`),
        fetch(`${API_BASE}/year/`),
        fetch(`${API_BASE}/semester/`)
      ]);
      setPrograms(await progRes.json());
      setYears(await yearRes.json());
      setSemesters(await semRes.json());
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Year
  const handleAddYear = async (e) => {
    e.preventDefault();
    if (!selectedProgramId) return alert("Select a program first");
    
    await fetch(`${API_BASE}/year/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year: yearForm.year, program: selectedProgramId }),
    });
    setYearForm({ year: '' });
    fetchInitialData();
  };

  // Add Semester
  const handleAddSemester = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/semester/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(semesterForm),
    });
    setSemesterForm({ semester: '', startDate: '', endDate: '', year: '' });
    setActiveYearId(null);
    fetchInitialData();
  };

  const filteredYears = years.filter(y => y.program === parseInt(selectedProgramId));

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="bg-amber-500 p-3 rounded-2xl shadow-lg shadow-amber-100">
            <CalendarDays className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800">Academic Timeline</h1>
            <p className="text-slate-500 font-medium">Configure Years and Semesters for specific Programs</p>
          </div>
        </div>

        {/* Program Selection */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Current Program Focus</label>
            <select 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 outline-none transition font-semibold text-slate-700"
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
            >
              <option value="">Select a Program to Manage...</option>
              {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          {selectedProgramId && (
            <form onSubmit={handleAddYear} className="flex gap-2">
              <input 
                type="number" 
                placeholder="Year (e.g. 1)" 
                className="w-32 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-500"
                value={yearForm.year}
                onChange={(e) => setYearForm({ year: e.target.value })}
                required
              />
              <button type="submit" className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition flex items-center gap-2">
                <Plus size={18} /> Add Year
              </button>
            </form>
          )}
        </div>

        {/* Timeline View */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-amber-500 w-10 h-10" /></div>
        ) : !selectedProgramId ? (
          <div className="text-center py-20 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
            <GraduationCap className="mx-auto w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-400 font-medium">Please select a program to view its academic years</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {filteredYears.map((y) => (
              <div key={y.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg font-bold text-sm">Year {y.year}</span>
                    <ChevronRight size={16} className="text-slate-300" />
                    <span className="text-slate-500 text-sm font-medium">Semesters</span>
                  </div>
                  <button 
                    onClick={() => {setActiveYearId(y.id); setSemesterForm({...semesterForm, year: y.id})}}
                    className="text-amber-600 hover:text-amber-700 font-bold text-xs flex items-center gap-1 uppercase tracking-tighter"
                  >
                    <Plus size={14} /> New Semester
                  </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {semesters.filter(s => s.year === y.id).map(s => (
                    <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group relative">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-black text-slate-700">Semester {s.semester}</h4>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                           <button className="text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={12} /> {s.startDate} to {s.endDate}
                        </div>
                      </div>
                    </div>
                  ))}

                  {activeYearId === y.id && (
                    <div className="p-4 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200">
                      <form onSubmit={handleAddSemester} className="space-y-3">
                        <input 
                          type="number" 
                          placeholder="Sem #" 
                          className="w-full p-2 text-sm rounded-lg border outline-none"
                          value={semesterForm.semester}
                          onChange={(e) => setSemesterForm({...semesterForm, semester: e.target.value})}
                          required
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="date" 
                            className="text-xs p-2 rounded-lg border outline-none" 
                            value={semesterForm.startDate}
                            onChange={(e) => setSemesterForm({...semesterForm, startDate: e.target.value})}
                            required
                          />
                          <input 
                            type="date" 
                            className="text-xs p-2 rounded-lg border outline-none" 
                            value={semesterForm.endDate}
                            onChange={(e) => setSemesterForm({...semesterForm, endDate: e.target.value})}
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="flex-1 bg-amber-500 text-white text-xs font-bold py-2 rounded-lg">Save</button>
                          <button type="button" onClick={() => setActiveYearId(null)} className="flex-1 bg-slate-200 text-slate-600 text-xs font-bold py-2 rounded-lg">Cancel</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicTimeline;