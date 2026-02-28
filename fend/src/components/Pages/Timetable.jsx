// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, Plus, Layers, BookOpen, User, CheckCircle2, AlertCircle, Loader2, UserCircle, Trash2 } from 'lucide-react';

// const Timetable = () => {
//   // Data states
//   const [classTypes, setClassTypes] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [teachers, setTeachers] = useState([]);
  
//   // UI & Loading states
//   const [loading, setLoading] = useState(false);
//   const [viewLoading, setViewLoading] = useState(false);
//   const [status, setStatus] = useState({ type: '', msg: '' });
  
//   // Viewing states
//   const [viewMode, setViewMode] = useState('create'); 
//   const [timetableData, setTimetableData] = useState([]);
//   const [selectedTeacherId, setSelectedTeacherId] = useState(null);

//   const [form, setForm] = useState({
//     weekday: 'MON',
//     startTime: '10:00',
//     endTime: '12:00',
//     classType: '',
//     semester: '',
//     teacher: '',
//     startDate: '', 
//     endDate: ''    
//   });

//   const API_BASE = 'http://127.0.0.1:8000/api/v1';

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   const fetchInitialData = async () => {
//     try {
//       const [ctRes, semRes, teaRes] = await Promise.all([
//         fetch(`${API_BASE}/class-type/`),
//         fetch(`${API_BASE}/semester/`),
//         fetch(`${API_BASE}/teacher/`)
//       ]);
//       setClassTypes(await ctRes.json());
//       const semesterData = await semRes.json();
//       console.log("here is the semester response", semesterData)
//       setSemesters(semesterData);
//       setTeachers(await teaRes.json());
//     } catch (err) {
//       console.error("Setup data fetch failed", err);
//     }
//   };

//   const fetchAllTimetables = async () => {
//     setViewLoading(true);
//     setViewMode('all');
//     try {
//       const res = await fetch(`${API_BASE}/timetable/`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}` },
//       });
//       const data = await res.json();
//       setTimetableData(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setViewLoading(false);
//     }
//   };

//   const fetchTeacherTimetable = async (teacherId) => {
//     setViewLoading(true);
//     setSelectedTeacherId(teacherId);
//     setViewMode('teacher-specific');
//     try {
//       const res = await fetch(`${API_BASE}/timetable/?teacher=${teacherId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}` },
//       });
//       const data = await res.json();
//       setTimetableData(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setViewLoading(false);
//     }
//   };

//   const handleSelectedSemester = (e) => {
//     const semesterId = e.target.value;
//     const selectedSem = semesters.find((s) => s.id.toString() === semesterId.toString());
//     setForm({
//       ...form,
//       semester: semesterId,
//       startDate: selectedSem?.startDate || '',
//       endDate: selectedSem?.endDate || ''
//     });
//   };

//   /**
//    * COMPLETE DELETE LOGIC
//    */
//   const handleDeleteTimeTable = async (timetableId) => {
//     if (!window.confirm("Are you sure you want to delete this timetable entry? This will not remove existing sessions already generated.")) return;

//     setViewLoading(true);
//     setStatus({ type: '', msg: '' });
    
//     try {
//       const response = await fetch(`${API_BASE}/timetable/${timetableId}/`, {
//         method: 'DELETE',
//         headers: { 
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`
//         },
//       });

//       if (response.ok) {
//         // Remove from UI immediately
//         setTimetableData(prev => prev.filter(item => item.id !== timetableId));
//         setStatus({ type: 'success', msg: 'Timetable entry deleted successfully.' });
//       } else {
//         setStatus({ type: 'error', msg: 'Failed to delete. You might not have permission.' });
//       }
//     } catch (err) {
//       console.error("Delete Error:", err);
//       setStatus({ type: 'error', msg: 'Network error while deleting.' });
//     } finally {
//       setViewLoading(false);
//     }
//   };

//   const handleCreateTimetable = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus({ type: '', msg: '' });

//     try {
//       const response = await fetch(`${API_BASE}/timetable/`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`
//         },
//         body: JSON.stringify(form),
//       });

//       if (response.ok) {
//         setStatus({ type: 'success', msg: 'Timetable rule created and Weekly Sessions generated!' });
//         setForm({ ...form, classType: '', startDate: '', endDate: '', semester: '', teacher: '' });
//       } else {
//         const data = await response.json();
//         setStatus({ type: 'error', msg: data.detail || 'Failed to create timetable.' });
//       }
//     } catch (err) {
//       setStatus({ type: 'error', msg: 'Network error.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTeacherName = (id) => teachers.find(t => t.user === id)?.name || "Teacher";

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Navigation Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div className="flex items-center gap-4">
//             <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
//               <Layers size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black text-slate-800 tracking-tight">Academic Timetable</h1>
//               <p className="text-slate-500 text-sm">Manage faculty schedules and sessions</p>
//             </div>
//           </div>
          
//           <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
//             <button onClick={() => setViewMode('create')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'create' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Create</button>
//             <button onClick={fetchAllTimetables} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>All View</button>
//             <button onClick={() => setViewMode('teacher-list')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'teacher-list' || viewMode === 'teacher-specific' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>By Teacher</button>
//           </div>
//         </div>

//         {/* Status Alert */}
//         {status.msg && (
//           <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
//             {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
//             {status.msg}
//           </div>
//         )}

//         {/* --- CREATE MODE --- */}
//         {viewMode === 'create' && (
//           <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4">
//             <form onSubmit={handleCreateTimetable} className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                <div className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Teacher</label>
//                   <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={form.teacher} onChange={e => setForm({...form, teacher: e.target.value})} required>
//                     <option value="">Select Faculty</option>
//                     {teachers.map(t => <option key={t.user} value={t.user}>{t.name}</option>)}
//                   </select>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Class Type</label>
//                   <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={form.classType} onChange={e => setForm({...form, classType: e.target.value})} required>
//                     <option value="">Select Class</option>
//                     {classTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.code} - {ct.subject_name}</option>)}
//                   </select>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2 col-span-2">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Weekday</label>
//                     <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-indigo-600" value={form.weekday} onChange={e => setForm({...form, weekday: e.target.value})}>
//                       <option value="MON">Monday</option><option value="TUE">Tuesday</option><option value="WED">Wednesday</option><option value="THU">Thursday</option><option value="FRI">Friday</option><option value="SAT">Saturday</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Start Time</label>
//                     <input type="time" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} required />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">End Time</label>
//                     <input type="time" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} required />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Semester Cycle</label>
//                   <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium" value={form.semester} onChange={handleSelectedSemester} required>
//                     <option value="">Select Semester</option>
//                     {semesters.map(s => <option key={s.id} value={s.id}>Sem {s.semester} - ({s.programName})</option>)}
//                   </select>
//                 </div>
//                 <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 space-y-4 shadow-inner">
//                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={14} /> Date Range</p>
//                   <div className="space-y-3">
//                     <input type="date" className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-sm" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required />
//                     <input type="date" className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-sm" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} required />
//                   </div>
//                 </div>
//                 <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transition-all">
//                   {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Generate Weekly Schedule
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* --- TEACHER LIST MODE --- */}
//         {viewMode === 'teacher-list' && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
//             {teachers.map(t => (
//               <button key={t.user} onClick={() => fetchTeacherTimetable(t.user)} className="bg-white p-6 rounded-[2rem] border border-slate-200 text-left hover:border-indigo-400 hover:shadow-xl transition-all group">
//                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
//                   <UserCircle size={32} />
//                 </div>
//                 <h3 className="font-black text-slate-800 text-lg leading-tight">{t.name}</h3>
//                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Faculty ID: {t.user}</p>
//               </button>
//             ))}
//           </div>
//         )}

//         {/* --- DATA TABLE --- */}
//         {(viewMode === 'all' || viewMode === 'teacher-specific') && (
//           <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden animate-in zoom-in-95">
//             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
//               <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">
//                 {viewMode === 'all' ? "Comprehensive Schedule" : `Schedule for ${getTeacherName(selectedTeacherId)}`}
//               </h2>
//               {viewLoading && <Loader2 className="animate-spin text-indigo-600" />}
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
//                     <th className="px-8 py-4">Day</th>
//                     <th className="px-4 py-4">Slot</th>
//                     <th className="px-4 py-4">Course Details</th>
//                     <th className="px-4 py-4">Faculty</th>
//                     <th className="px-4 py-4 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {timetableData.length > 0 ? timetableData.map((item) => (
//                     <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
//                       <td className="px-8 py-4">
//                         <span className="bg-white border border-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-xs font-black">{item.weekday}</span>
//                       </td>
//                       <td className="px-4 py-4 text-sm font-bold text-slate-600">
//                         {item.startTime?.slice(0,5)} - {item.endTime?.slice(0,5)}
//                       </td>
//                       <td className="px-4 py-4">
//                         <p className="text-sm font-black text-slate-800">{item.classType?.code}</p>
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.classType?.subject_name}</p>
//                       </td>
//                       <td className="px-4 py-4 text-sm font-bold text-indigo-600">
//                         {item.teacher?.name}
//                       </td>
//                       <td className="px-4 py-4 text-center">
//                         <button 
//                           onClick={() => handleDeleteTimeTable(item.id)}
//                           className="inline-flex items-center justify-center p-2.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all group"
//                           title="Delete Timetable"
//                         >
//                           <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
//                         </button>
//                       </td>
//                     </tr>
//                   )) : (
//                     <tr>
//                       <td colSpan="5" className="px-8 py-12 text-center text-slate-400 font-medium italic">
//                         No timetable entries found for this selection.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Timetable;




// ################



import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Layers, BookOpen, User, CheckCircle2, AlertCircle, Loader2, UserCircle, Trash2, ChevronRight } from 'lucide-react';

const Timetable = () => {
  // Auth Data
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isAdmin = userData?.isAdmin || userData?.staffType_name === 'HOD';
  const loggedInTeacherId = userData?.id || userData?.user; // Adjusted for your storage keys

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

  const [form, setForm] = useState({
    weekday: 'MON',
    startTime: '10:00',
    endTime: '12:00',
    classType: '',
    semester: '',
    teacher: isAdmin ? '' : loggedInTeacherId, // Auto-fill for teachers
    startDate: '', 
    endDate: ''    
  });

  const API_BASE = 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    fetchInitialData();
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

  const fetchAllTimetables = async () => {
    if (!isAdmin) return; // Guard clause
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

  const fetchTeacherTimetable = async (teacherId) => {
    setViewLoading(true);
    setSelectedTeacherId(teacherId);
    setViewMode('teacher-specific');
    try {
      const res = await fetch(`${API_BASE}/timetable/?teacher=${teacherId}`, {
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

  // Helper for teachers to view only their own schedule
  const handleMySchedule = () => {
    fetchTeacherTimetable(loggedInTeacherId);
  };

  const handleSelectedSemester = (e) => {
    const semesterId = e.target.value;
    const selectedSem = semesters.find((s) => s.id.toString() === semesterId.toString());
    setForm({
      ...form,
      semester: semesterId,
      startDate: selectedSem?.startDate || '',
      endDate: selectedSem?.endDate || ''
    });
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

  const handleCreateTimetable = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });
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
        setStatus({ type: 'success', msg: 'Timetable rule created!' });
        setForm({ ...form, classType: '', startDate: '', endDate: '', semester: '' });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', msg: data.detail || 'Failed to create.' });
      }
    } catch (err) { setStatus({ type: 'error', msg: 'Network error.' }); }
    finally { setLoading(false); }
  };

  const getTeacherName = (id) => teachers.find(t => t.user === id)?.name || "Faculty Member";

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header and Mode Selection */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
              <Layers size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Academic Timetable</h1>
              <p className="text-slate-500 text-sm">Welcome, {userData?.name || 'User'}</p>
            </div>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button onClick={() => setViewMode('create')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'create' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Create</button>
            
            {/* ADMIN ONLY BUTTONS */}
            {isAdmin && (
              <>
                <button onClick={fetchAllTimetables} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>All View</button>
                <button onClick={() => setViewMode('teacher-list')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'teacher-list' || (viewMode === 'teacher-specific' && selectedTeacherId !== loggedInTeacherId) ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>By Teacher</button>
              </>
            )}

            {/* TEACHER ONLY BUTTON */}
            {!isAdmin && (
              <button onClick={handleMySchedule} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'teacher-specific' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>My Schedule</button>
            )}
          </div>
        </div>

        {status.msg && (
          <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            {status.msg}
          </div>
        )}

        {/* --- CREATE MODE --- */}
        {viewMode === 'create' && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4">
            <form onSubmit={handleCreateTimetable} className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Teacher</label>
                  <select 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-medium disabled:opacity-60" 
                    value={form.teacher} 
                    onChange={e => setForm({...form, teacher: e.target.value})} 
                    required
                    disabled={!isAdmin} // Non-admins can't change teacher
                  >
                    <option value="">Select Faculty</option>
                    {teachers.map(t => <option key={t.user} value={t.user}>{t.name}</option>)}
                  </select>
                </div>
                {/* ... other form fields (ClassType, Weekday, Time) remain exactly as your previous code ... */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Class Type</label>
                  <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={form.classType} onChange={e => setForm({...form, classType: e.target.value})} required>
                    <option value="">Select Class</option>
                    {classTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.code} - {ct.subject_name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Weekday</label>
                    <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-indigo-600" value={form.weekday} onChange={e => setForm({...form, weekday: e.target.value})}>
                      <option value="MON">Monday</option><option value="TUE">Tuesday</option><option value="WED">Wednesday</option><option value="THU">Thursday</option><option value="FRI">Friday</option><option value="SAT">Saturday</option>
                    </select>
                  </div>
                  <div className="space-y-2"><input type="time" className="w-full p-3 bg-slate-50 rounded-2xl font-bold" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} required /></div>
                  <div className="space-y-2"><input type="time" className="w-full p-3 bg-slate-50 rounded-2xl font-bold" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} required /></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={form.semester} onChange={handleSelectedSemester} required>
                    <option value="">Select Semester</option>
                    {semesters.map(s => <option key={s.id} value={s.id}>Sem {s.semester} - ({s.programName})</option>)}
                  </select>
                </div>
                <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 space-y-4">
                  <input type="date" className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-sm" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required />
                  <input type="date" className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-sm" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} required />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg">
                  {loading && <Loader2 className="animate-spin" /> } Generate Weekly Schedule
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
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="font-black text-slate-800 uppercase tracking-widest text-xs">
                {viewMode === 'all' ? "Comprehensive Schedule" : `Schedule for ${getTeacherName(selectedTeacherId)}`}
              </h2>
              {viewLoading && <Loader2 className="animate-spin text-indigo-600" />}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="px-8 py-4">Day</th>
                    <th className="px-4 py-4">Slot</th>
                    <th className="px-4 py-4">Course Details</th>
                    <th className="px-4 py-4">Faculty</th>
                    {isAdmin && <th className="px-4 py-4 text-center">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {timetableData.map((item) => (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-8 py-4"><span className="bg-white border border-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-xs font-black">{item.weekday}</span></td>
                      <td className="px-4 py-4 text-sm font-bold text-slate-600">{item.startTime?.slice(0,5)} - {item.endTime?.slice(0,5)}</td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-black text-slate-800">{item.classType?.code}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.classType?.subject_name}</p>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-indigo-600">{item.teacher?.name}</td>
                      {isAdmin && (
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => handleDeleteTimeTable(item.id)} className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                        </td>
                      )}
                    </tr>
                  ))}
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