import React, { useState, useEffect } from 'react';
import { UserPlus, Fingerprint, Trash2, Loader2, Search, GraduationCap, Hash, VenusAndMars, CheckCircle, XCircle } from 'lucide-react';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [biometrics, setBiometrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Forms
  const [studentForm, setStudentForm] = useState({
    prn: '',
    name: '',
    gender: 'M',
    rollNumber: '',
    semester: ''
  });
  const [biometricForm, setBiometricForm] = useState({ student: '', biometric: '' });

  const API_BASE = 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    fetchData();
  }, []);

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("accessToken") || ""}`
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const [stdRes, semRes, bioRes] = await Promise.all([
        fetch(`${API_BASE}/student/`, { headers: authHeaders }),
        fetch(`${API_BASE}/semester/`, { headers: authHeaders }),
        fetch(`${API_BASE}/biometric/`, { headers: authHeaders })
      ]);
      const retrievedStudents = await stdRes.json();
      console.log("Fetched Students:", retrievedStudents);
      setStudents(retrievedStudents);
      setSemesters(await semRes.json());
      setBiometrics(await bioRes.json());
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/student/`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(studentForm),
    });
    setStudentForm({ prn: '', name: '', gender: 'M', rollNumber: '', semester: '' });
    fetchData();
  };

  const handleAddBiometric = async (e) => {
    e.preventDefault();
    setBiometricForm(prev => ({ ...prev, student: parseInt(prev.student) }));
    console.log("Submitting Biometric Data:", biometricForm);
    await fetch(`${API_BASE}/biometric/`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(biometricForm),
    });
    setBiometricForm({ student: '', biometric: '' });
    fetchData();
  };

  const deleteItem = async (endpoint, id) => {
    if (window.confirm("Permanent deletion! Are you sure?")) {
      await fetch(`${API_BASE}/${endpoint}/${id}/`, { method: 'DELETE', headers: authHeaders });
      fetchData();
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.prn.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg text-white">
              <GraduationCap size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Student Enrollment</h1>
              <p className="text-slate-500 font-medium">Manage student profiles and biometric registration</p>
            </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by Name or PRN..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FORMS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Student Registration Form */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-blue-600">
                <UserPlus size={16} /> 1. New Admission
              </h2>
              <form onSubmit={handleAddStudent} className="space-y-3">
                <input type="text" placeholder="PRN Number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  value={studentForm.prn} onChange={(e) => setStudentForm({...studentForm, prn: e.target.value})} required />
                
                <input type="text" placeholder="Full Name" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  value={studentForm.name} onChange={(e) => setStudentForm({...studentForm, name: e.target.value})} required />

                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  value={studentForm.gender} onChange={(e) => setStudentForm({...studentForm, gender: e.target.value})}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>

                <input type="text" placeholder="Roll Number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  value={studentForm.rollNumber} onChange={(e) => setStudentForm({...studentForm, rollNumber: e.target.value})} required />

                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none font-medium"
                  value={studentForm.semester} onChange={(e) => setStudentForm({...studentForm, semester: e.target.value})} required>
                  <option value="">Current Semester</option>
                  {semesters.map(s => <option key={s.id} value={s.id}>Semester {s.semester}</option>)}
                </select>

                <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl transition hover:bg-blue-700 shadow-lg shadow-blue-50 text-sm">
                  Enroll Student
                </button>
              </form>
            </div>

            {/* Biometric Registry Form (Optional) */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 ring-2 ring-indigo-50">
              <h2 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-indigo-600">
                <Fingerprint size={16} /> 2. Biometric Scan
              </h2>
              <form onSubmit={handleAddBiometric} className="space-y-3">
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  value={biometricForm.student} onChange={(e) => setBiometricForm({...biometricForm, student: e.target.value})} required>
                  <option value="">Select Student</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.prn})</option>)}
                </select>
                <textarea 
                  placeholder="Paste Biometric Hash/Template Data..." 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none h-24"
                  value={biometricForm.biometric}
                  onChange={(e) => setBiometricForm({...biometricForm, biometric: e.target.value})}
                  required
                />
                <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl transition hover:bg-indigo-700 text-sm">
                  Register Fingerprint
                </button>
              </form>
            </div>
          </div>

          {/* STUDENT DATA TABLE */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600 w-10 h-10" /></div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Student Info</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Identification</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Biometric</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredStudents.map((student) => {
                      const hasBio = biometrics.some(b => b.student === student.id);
                      return (
                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">{student.name}</p>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                                  <VenusAndMars size={12} /> {student.gender === 'M' ? 'Male' : student.gender === 'F' ? 'Female' : 'Other'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <Hash size={14} className="text-slate-300" /> PRN: {student.prn}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <CheckCircle size={14} className="text-slate-300" /> Roll: {student.rollNumber}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            {hasBio ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100">
                                <Fingerprint size={12} /> Registered
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-400 rounded-full text-[10px] font-black uppercase border border-rose-100">
                                <XCircle size={12} /> Not Set
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <button 
                              onClick={() => deleteItem('student', student.id)}
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Student;