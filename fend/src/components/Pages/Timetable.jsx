import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Layers, BookOpen, User, CheckCircle2, AlertCircle, Loader2, UserCircle, Trash2, ChevronRight, Users } from 'lucide-react';

const Timetable = () => {
  // Auth Data
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isAdmin = userData?.isAdmin || userData?.staffType_name === 'HOD';
  const loggedInTeacherId = userData?.id || userData?.user;

  // Data states
  const [classTypes, setClassTypes] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);
  
  // UI & Loading states
  const [loading, setLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  
  // Viewing states
  const [viewMode, setViewMode] = useState('create'); 
  const [timetableData, setTimetableData] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  const API_BASE = 'http://127.0.0.1:8000/api/v1';

  const [form, setForm] = useState({
    weekday: 'MON',
    startTime: '10:00',
    endTime: '12:00',
    classType: '',
    semesters: [],
    isCombined: false,
    teacher: isAdmin ? '' : loggedInTeacherId,
    startDate: '', 
    endDate: ''    
  });

  useEffect(() => {
    fetchInitialData();
    // Automatically load schedule if user is a teacher
    if (!isAdmin && loggedInTeacherId) {
      handleMySchedule();
    }
  }, []);

  const fetchInitialData = async () => {
    try {
      const [ctRes, semRes, teaRes] = await Promise.all([
        fetch(`${API_BASE}/class-type/`),
        fetch(`${API_BASE}/semester/`),
        fetch(`${API_BASE}/teacher/`)
      ]);
      setClassTypes(await ctRes.json());
      setSemesters(await semRes.json());
      setTeachers(await teaRes.json());
    } catch (err) {
      console.error("Setup data fetch failed", err);
    }
  };

  /**
   * FIX: Added the missing handleMySchedule function
   */
  const handleMySchedule = () => {
    if (loggedInTeacherId) {
      fetchTeacherTimetable(loggedInTeacherId);
    } else {
      setStatus({ type: 'error', msg: 'User ID not found. Please re-login.' });
    }
  };

  const fetchTeacherTimetable = async (teacherId) => {
    setViewLoading(true);
    setSelectedTeacherId(teacherId);
    setViewMode('teacher-specific');
    try {
      const res = await fetch(`${API_BASE}/timetable/?teacher=${teacherId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}` },
      });
      const data = await res.json();
      console.log('Fetched Timetable Data for Teacher ID', teacherId, data);
      setTimetableData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setViewLoading(false);
    }
  };

  const fetchAllTimetables = async () => {
    if (!isAdmin) return;
    setViewLoading(true);
    setViewMode('all');
    try {
      const res = await fetch(`${API_BASE}/timetable/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}` },
      });
      const data = await res.json();
      setTimetableData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setViewLoading(false);
    }
  };

  // Multi-select handler for semesters
  const handleSemesterToggle = (semId, semStartDate, semEndDate) => {
    const isAlreadySelected = form.semesters.includes(semId);
    let newSemesters;
    
    if (isAlreadySelected) {
      newSemesters = form.semesters.filter(id => id !== semId);
    } else {
      newSemesters = [...form.semesters, semId];
    }

    setForm({
      ...form,
      semesters: newSemesters,
      startDate: newSemesters.length === 1 ? semStartDate : form.startDate,
      endDate: newSemesters.length === 1 ? semEndDate : form.endDate
    });
  };

  const handleCreateTimetable = async (e) => {
    e.preventDefault();
    if (form.semesters.length === 0) {
        setStatus({ type: 'error', msg: 'Please select at least one semester.' });
        return;
    }
    setLoading(true);
    setStatus({ type: '', msg: '' });
    console.log('Submitting Timetable Form:', form);
    try {
      const response = await fetch(`${API_BASE}/timetable/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus({ type: 'success', msg: 'Timetable rule created successfully!' });
        setForm({ ...form, classType: '', semesters: [], isCombined: false, startDate: '', endDate: '' });
        // Refresh view if in teacher-specific mode
        if (viewMode === 'teacher-specific') handleMySchedule();
      } else {
        const data = await response.json();
        setStatus({ type: 'error', msg: data.detail || 'Failed to create.' });
      }
    } catch (err) { setStatus({ type: 'error', msg: 'Network error.' }); }
    finally { setLoading(false); }
  };

  const handleDeleteTimeTable = async (timetableId) => {
    if (!window.confirm("Delete this timetable rule?")) return;
    setViewLoading(true);
    try {
      const response = await fetch(`${API_BASE}/timetable/${timetableId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}` },
      });
      if (response.ok) {
        setTimetableData(prev => prev.filter(item => item.id !== timetableId));
        setStatus({ type: 'success', msg: 'Deleted successfully.' });
      }
    } catch (err) { console.error(err); }
    finally { setViewLoading(false); }
  };

  const getTeacherName = (id) => teachers.find(t => t.user === id)?.name || "Faculty Member";

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
              <Layers size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Academic Timetable</h1>
              <p className="text-slate-500 text-sm font-bold">Welcome, {userData?.name || 'User'}</p>
            </div>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm font-bold">
            <button onClick={() => setViewMode('create')} className={`px-4 py-2 rounded-lg text-sm transition-all ${viewMode === 'create' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Create</button>
            {isAdmin && (
              <button onClick={fetchAllTimetables} className={`px-4 py-2 rounded-lg text-sm transition-all ${viewMode === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>All View</button>
            )}
            <button onClick={() => isAdmin ? setViewMode('teacher-list') : handleMySchedule()} className={`px-4 py-2 rounded-lg text-sm transition-all ${viewMode.includes('teacher') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                {isAdmin ? 'By Teacher' : 'My Schedule'}
            </button>
          </div>
        </div>

        {status.msg && (
          <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            {status.msg}
          </div>
        )}

        {/* --- CREATE MODE --- */}
        {viewMode === 'create' && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4">
            <form onSubmit={handleCreateTimetable} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-8">
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-3">
                        <Users className="text-indigo-600" size={20} />
                        <div>
                            <p className="text-sm font-black text-slate-800 uppercase leading-none mb-1">Combined Lecture</p>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Multiple classes joined</p>
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setForm({...form, isCombined: !form.isCombined})}
                        className={`w-12 h-6 rounded-full transition-all relative ${form.isCombined ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${form.isCombined ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Teacher</label>
                  <select 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold disabled:opacity-50" 
                    value={form.teacher} 
                    onChange={e => setForm({...form, teacher: e.target.value})} 
                    required disabled={!isAdmin}
                  >
                    <option value="">Select Faculty</option>
                    {teachers.map(t => <option key={t.user} value={t.user}>{t.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Class Type</label>
                  <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold" value={form.classType} onChange={e => setForm({...form, classType: e.target.value})} required>
                    <option value="">Select Class</option>
                    {classTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.code} - {ct.subject_name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Weekday</label>
                    <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-indigo-600" value={form.weekday} onChange={e => setForm({...form, weekday: e.target.value})}>
                      <option value="MON">Monday</option><option value="TUE">Tuesday</option><option value="WED">Wednesday</option><option value="THU">Thursday</option><option value="FRI">Friday</option><option value="SAT">Saturday</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Start</label>
                    <input type="time" className="w-full p-3 bg-slate-50 rounded-2xl font-bold" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">End</label>
                    <input type="time" className="w-full p-3 bg-slate-50 rounded-2xl font-bold" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} required />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Semesters (Multi-select)</label>
                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                        {semesters.map(s => (
                            <label key={s.id} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${form.semesters.includes(s.id) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200'}`}>
                                <div className="flex flex-col">
                                    <span className="font-black text-sm uppercase">Sem {s.semester}</span>
                                    <span className={`text-[10px] font-bold ${form.semesters.includes(s.id) ? 'text-indigo-100' : 'text-slate-400'}`}>{s.programName}</span>
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={form.semesters.includes(s.id)}
                                    onChange={() => handleSemesterToggle(s.id, s.startDate, s.endDate)}
                                />
                                {form.semesters.includes(s.id) && <CheckCircle2 size={16} />}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 space-y-4 shadow-inner">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 font-bold"><Calendar size={14} /> Schedule Duration</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-xs font-bold" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required />
                    <input type="date" className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-xs font-bold" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} required />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Generate Schedule
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- TEACHER LIST MODE (ADMIN ONLY) --- */}
        {viewMode === 'teacher-list' && isAdmin && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
            {teachers.map(t => (
              <button key={t.user} onClick={() => fetchTeacherTimetable(t.user)} className="bg-white p-6 rounded-[2rem] border border-slate-200 text-left hover:border-indigo-400 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <UserCircle size={32} />
                </div>
                <h3 className="font-black text-slate-800 text-lg leading-tight">{t.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Faculty ID: {t.user}</p>
              </button>
            ))}
          </div>
        )}

        {/* --- DATA TABLE --- */}
        {(viewMode === 'all' || viewMode === 'teacher-specific') && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center px-8">
              <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">
                {viewMode === 'all' ? "Global Schedule" : `Schedule: ${getTeacherName(selectedTeacherId)}`}
              </h2>
              {viewLoading && <Loader2 className="animate-spin text-indigo-600" />}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="px-8 py-4">Status</th>
                    <th className="px-4 py-4">Day & Slot</th>
                    <th className="px-4 py-4">Semesters & Programs</th>
                    <th className="px-4 py-4">Details</th>
                    {isAdmin && <th className="px-4 py-4 text-center">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-bold">
                  {timetableData.length > 0 ? timetableData.map((item) => (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-8 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.isCombined ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {item.isCombined ? 'Combined' : 'Standard'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs font-black text-indigo-600 uppercase mb-0.5">{item.weekday}</p>
                        <p className="text-sm text-slate-600">{item.startTime?.slice(0,5)} - {item.endTime?.slice(0,5)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                            {item?.semesters.map(s => (
                                <span key={s.id} className="bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black">Sem {s?.semester} - ({s?.year?.program?.name})</span>
                            )) || <span className="text-xs italic text-slate-400 font-medium">No Semesters</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-800 uppercase tracking-tight">{item.classType?.code}</p>
                        <p className="text-[10px] text-slate-400 uppercase">{item.teacher?.name}</p>
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => handleDeleteTimeTable(item.id)} className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                        </td>
                      )}
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-12 text-center text-slate-400 italic">No records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timetable;