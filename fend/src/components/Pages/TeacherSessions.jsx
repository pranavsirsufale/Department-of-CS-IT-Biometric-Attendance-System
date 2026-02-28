import React, { useState, useEffect } from 'react';
import { CheckCircle2, UserCheck, Clock, BookOpen, ChevronRight, Loader2, Save, CalendarDays, GraduationCap, Hash, Layout, AlertCircle, Users, ClipboardList, Info, Calendar as CalendarIcon, Tag } from 'lucide-react';

const TeacherSessions = () => {
  const [view, setView] = useState('timetables');
  
  const getLocalDateString = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [timetables, setTimetables] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const API_BASE = 'http://127.0.0.1:8000/api/v1';
  const userData = JSON.parse(localStorage.getItem('userData'));
  const teacherId = userData?.id; 

  const calendarDates = Array.from({ length: 15 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 7 + i);
    return d;
  });

  useEffect(() => {
    fetchTeacherTimetables();
  }, []);

  const getStats = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(val => val === true).length;
    return { total, present, absent: total - present };
  };

  const fetchTeacherTimetables = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/timetable/?teacher=${teacherId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      const data = await res.json();
      setTimetables(data);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to load timetable rules.' });
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionsByDate = async (timetableId, dateObj) => {
    setLoading(true);
    const dateStr = getLocalDateString(dateObj);
    try {
      setSessions([]); 
      const res = await fetch(`${API_BASE}/session/?timetable=${timetableId}&date=${dateStr}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Error fetching daily sessions.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTimetable = (t) => {
    setSelectedTimetable(t);
    const today = new Date();
    setSelectedDate(today);
    setView('sessions');
    fetchSessionsByDate(t.id, today);
  };

  const handleCalendarDateClick = (date) => {
    setSelectedDate(date);
    fetchSessionsByDate(selectedTimetable.id, date);
  };

  const loadAttendanceSheet = async (session) => {
    setLoading(true);
    setSelectedSession(session);
    try {
      const studentRes = await fetch(`${API_BASE}/student/?semester=${selectedTimetable.semester.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      const studentData = await studentRes.json();
      setStudents(studentData);

      const attendanceRes = await fetch(`${API_BASE}/attendance/?session=${session.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      const existingAttendance = await attendanceRes.json();

      const initialStore = {};
      if (existingAttendance && existingAttendance.length > 0) {
        existingAttendance.forEach(record => {
          const sId = typeof record.student === 'object' ? record.student.id : record.student;
          initialStore[sId] = record.status;
        });
        studentData.forEach(s => {
          if (!(s.id in initialStore)) initialStore[s.id] = true;
        });
      } else {
        studentData.forEach(s => initialStore[s.id] = true);
      }
      setAttendance(initialStore);
      setView('attendance');
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to load data.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleStudent = (id) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const submitAttendance = async () => {
    setLoading(true);
    try {
      const records = Object.keys(attendance).map(studentId => ({
        student: studentId,
        session: selectedSession.id,
        status: attendance[studentId]
      }));
      const res = await fetch(`${API_BASE}/attendance/bulk-create/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("accessToken")}` 
        },
        body: JSON.stringify({ records })
      });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Attendance saved successfully!' });
        setView('sessions');
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Submission failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 w-fit text-sm font-bold shadow-sm">
          <button onClick={() => { setView('timetables'); setSelectedTimetable(null); }} className={`${view === 'timetables' ? 'text-indigo-600' : 'text-slate-400'}`}>My Courses</button>
          {selectedTimetable && (
            <>
              <ChevronRight size={14} className="text-slate-300" />
              <button onClick={() => setView('sessions')} className={`${view === 'sessions' ? 'text-indigo-600' : 'text-slate-400'}`}>Daily Console</button>
            </>
          )}
        </div>

        {/* --- VIEW 1: TIMETABLES --- */}
        {view === 'timetables' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in">
            {timetables.map(t => (
              <div key={t.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider">{t.program}</span>
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${t.classType?.deliverymode?.mode === 'Practical' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                        {t.classType?.deliverymode?.mode}
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider">Sem {t.semester?.semester}</span>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">{t.classType?.subject?.name}</h3>
                <div className="flex items-center gap-2 text-slate-400 mb-6 font-mono text-xs font-bold uppercase tracking-widest">
                  <Hash size={14} className="text-indigo-400" /> {t.classType?.code}
                </div>
                <button onClick={() => handleOpenTimetable(t)} className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 mt-auto">
                  Open Today's Session <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* --- VIEW 2: SESSIONS WITH CALENDAR STRIP --- */}
        {view === 'sessions' && (
          <div className="animate-in slide-in-from-right-4">
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 mb-8 overflow-hidden">
                <div className="flex items-center justify-between mb-6 px-4">
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Select Class Date</h2>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full uppercase tracking-widest font-bold">
                        {selectedDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </span>
                </div>
                <div className="flex justify-between gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {calendarDates.map((date, idx) => {
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        const isToday = date.toDateString() === new Date().toDateString();
                        return (
                            <button 
                                key={idx} 
                                onClick={() => handleCalendarDateClick(date)}
                                className={`flex flex-col items-center min-w-[65px] p-4 rounded-[2rem] transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 hover:bg-slate-100 text-slate-400'}`}
                            >
                                <span className={`text-[10px] font-black uppercase mb-1 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                                    {date.toLocaleDateString('en-GB', { weekday: 'short' })}
                                </span>
                                <span className="text-lg font-black">{date.getDate()}</span>
                                {isToday && !isSelected && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1"></div>}
                            </button>
                        );
                    })}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                    <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Fetching daily records...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sessions.length > 0 ? sessions.map(s => (
                        <button key={s.id} onClick={() => loadAttendanceSheet(s)} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-left hover:border-indigo-600 hover:shadow-xl transition-all group flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <Clock size={24} />
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                                        {selectedTimetable?.classType?.deliverymode?.mode}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Session ID: {s.id}</p>
                                <p className="text-xl font-black text-slate-800 font-mono">
                                {(() => {
                                  const dateStr = s.startDateTime.replace('Z', ''); 
                                  const d = new Date(dateStr);

                                  return d.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                  });
                                })()}
                                </p>
                                <div className="mt-4 pt-4 border-t border-slate-50">
                                    <p className="text-sm font-bold text-slate-700">{selectedTimetable?.classType?.subject?.name}</p>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase">{selectedTimetable?.program}</p>
                                </div>
                            </div>
                        </button>
                    )) : (
                        <div className="col-span-full py-20 bg-slate-100/30 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                            <CalendarIcon className="mx-auto text-slate-300 mb-4" size={48} />
                            <h3 className="text-lg font-black text-slate-400">No Scheduled Sessions</h3>
                            <p className="text-sm text-slate-400 font-medium italic">No classes found for {selectedDate.toDateString()}</p>
                        </div>
                    )}
                </div>
            )}
          </div>
        )}

        {/* --- VIEW 3: ATTENDANCE SHEET --- */}
        {view === 'attendance' && (
           <div className="animate-in zoom-in-95">
             {/* Header Section for context */}
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="bg-indigo-900 p-4 rounded-3xl text-white"><ClipboardList size={32}/></div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800">{selectedTimetable?.classType?.subject?.name}</h2>
                        <div className="flex gap-4 mt-1">
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase"><Tag size={12}/> {selectedTimetable?.classType?.deliverymode?.mode}</div>
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase"><Layout size={12}/> Sem {selectedTimetable?.semester?.semester}</div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-50 px-6 py-3 rounded-2xl text-center border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marking Date & Time</p>
                    <p className="text-sm font-black text-indigo-600 font-mono">{selectedSession?.startDateTime}</p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                        <p className="text-3xl font-black text-indigo-600">{getStats().present}</p>
                        <p className="text-xs font-black text-slate-400 uppercase mt-1 font-bold">Present</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                        <p className="text-3xl font-black text-rose-500">{getStats().absent}</p>
                        <p className="text-xs font-black text-slate-400 uppercase mt-1 font-bold">Absent</p>
                    </div>
                    <button onClick={submitAttendance} disabled={loading} className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black shadow-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all active:scale-95">
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />} Confirm Sheet
                    </button>
                </div>

                <div className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
                    <div className="max-h-[60vh] overflow-y-auto scrollbar-hide px-4">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-white z-10 border-b border-slate-50">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-10 py-5">Student Identity</th>
                                    <th className="px-10 py-5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {students.map(student => (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-10 py-6">
                                            <p className="font-black text-slate-800">{student.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase font-mono">PRN: {student.prn || student.rollNumber}</p>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <button 
                                                onClick={() => toggleStudent(student.id)}
                                                className={`relative w-14 h-8 transition-all rounded-full p-1 border-2 ${attendance[student.id] ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-200 border-slate-200'}`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all transform ${attendance[student.id] ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSessions;