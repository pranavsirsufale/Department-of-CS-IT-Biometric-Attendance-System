import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { UserPlus, Fingerprint, Trash2, Loader2, Users, Search, GraduationCap, Hash, VenusAndMars, CheckCircle, ChevronRight, Globe, Save, Fingerprint as BioIcon } from 'lucide-react';

const Student = () => {
  // Data states
  const [programs, setPrograms] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // FORM HIERARCHY STATES
  const [formYears, setFormYears] = useState([]);
  const [formSemesters, setFormSemesters] = useState([]);
  const [selProgForm, setSelProgForm] = useState('');
  const [selYearForm, setSelYearForm] = useState('');

  // LISTING HIERARCHY STATES
  const [listView, setListView] = useState('hierarchy');
  const [listYears, setListYears] = useState([]);
  const [listSemesters, setListSemesters] = useState([]);
  const [selProgList, setSelProgList] = useState('');
  const [selYearList, setSelYearList] = useState('');
  const [selSemList, setSelSemList] = useState('');

  const [studentForm, setStudentForm] = useState({ 
    prn: '', 
    name: '', 
    gender: 'M', 
    rollNumber: '', 
    semester: '' 
  });

  const [biometricForm, setBiometricForm] = useState({ 
    student: '', 
    biometric: '' 
  });

  const API_BASE = 'http://127.0.0.1:8000/api/v1';
  const authHeaders = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("accessToken") || ""}` };

  useEffect(() => {
    fetchInitialPrograms();
  }, []);

  const fetchInitialPrograms = async () => {
    const res = await fetch(`${API_BASE}/program/`, { headers: authHeaders });
    setPrograms(await res.json());
  };

  // --- FORM HIERARCHY LOGIC ---
  const handleProgChangeForm = async (progId) => {
    setSelProgForm(progId);
    setSelYearForm('');
    setFormSemesters([]);
    const res = await fetch(`${API_BASE}/year/?program=${progId}`, { headers: authHeaders });
    setFormYears(await res.json());
  };

  const handleYearChangeForm = async (yearId) => {
    setSelYearForm(yearId);
    const res = await fetch(`${API_BASE}/semester/?year=${yearId}`, { headers: authHeaders });
    setFormSemesters(await res.json());
  };

  // --- LISTING HIERARCHY LOGIC ---
  const handleProgChangeList = async (progId) => {
    setSelProgList(progId);
    setSelYearList('');
    setSelSemList('');
    setListSemesters([]);
    const res = await fetch(`${API_BASE}/year/?program=${progId}`, { headers: authHeaders });
    setListYears(await res.json());
  };

  const handleYearChangeList = async (yearId) => {
    setSelYearList(yearId);
    setSelSemList('');
    const res = await fetch(`${API_BASE}/semester/?year=${yearId}`, { headers: authHeaders });
    setListSemesters(await res.json());
  };

const handleGetBiometric = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const res = await fetch("http://127.0.0.1:5000/capture");

        if (!res.ok) {
            throw new Error("Server error while capturing biometric");
        }

        const data = await res.json();
        // console.log("Handle get biometric response", data)

        // Validate response format
        if (data.status !== "success" || !data.template) {
            throw new Error("Invalid biometric response");
        }

        // Store Base64 template
        setBiometricForm(prev => ({
            ...prev,
            biometric: data.template
        }));

        // console.log("Captured Template:", data.template);
        alert("Biometric Captured Successfully!");

    } catch (err) {
        console.error("Biometric Error:", err);
        alert("Failed to capture biometric");
    } finally {
        setLoading(false);
    }
};

  const fetchStudentsBySemester = async (semId) => {
    setSelSemList(semId);
    setLoading(true);
    const res = await fetch(`${API_BASE}/student/?semester=${semId}`, { headers: authHeaders });
    setStudents(await res.json());
    setLoading(false);
  };

  const fetchAllStudents = async () => {
    setListView('all');
    setLoading(true);
    const res = await fetch(`${API_BASE}/student/`, { headers: authHeaders });
    const data = await res.json();
    console.log("Fetched All Students:", data);
    setStudents(data);
    setLoading(false);
=======
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [stdRes, semRes, bioRes] = await Promise.all([
        fetch(`${API_BASE}/student/`),
        fetch(`${API_BASE}/semester/`),
        fetch(`${API_BASE}/biometric/`)
      ]);
      setStudents(await stdRes.json());
      setSemesters(await semRes.json());
      setBiometrics(await bioRes.json());
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      setLoading(false);
    }
>>>>>>> 86c5c22 (add backend and frontend logic)
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const res = await fetch(`${API_BASE}/student/`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(studentForm),
    });
    if (res.ok) {
      alert("Student Successfully Enrolled!");
      setStudentForm({ prn: '', name: '', gender: 'M', rollNumber: '', semester: '' });
      setSelProgForm(''); setSelYearForm('');
    }
  };

const handleLinkBiometric = async (e) => {
    e.preventDefault();

    if (!biometricForm.student) {
        alert("Please select a student");
        return;
    }

    try {
        setLoading(true);

        // STEP 1: Capture biometric
        const captureRes = await fetch("http://127.0.0.1:5000/capture");

        if (!captureRes.ok) {
            throw new Error("Failed to capture biometric");
        }

        const captureData = await captureRes.json();

        if (captureData.status !== "success" || !captureData.template) {
            throw new Error("Invalid biometric response");
        }

        // STEP 2: Update UI immediately
        const updatedForm = {
            ...biometricForm,
            biometric: captureData.template
        };

        setBiometricForm(updatedForm);

        // STEP 3: Send to backend
        console.log("Sending Data:", updatedForm);

        const saveRes = await fetch(`${API_BASE}/biometric/`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(updatedForm),
        });

        const saveData = await saveRes.json();
        console.log("Biometric API Response:", saveData);

        if (!saveRes.ok) {
            throw new Error("Failed to save biometric");
        }

        alert("Biometric Captured & Linked Successfully!");

        // Reset form
        setBiometricForm({ student: '', biometric: '' });

    } catch (err) {
        console.error("Biometric Flow Error:", err);
        alert(err.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
};

=======
    await fetch(`${API_BASE}/student/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentForm),
    });
    setStudentForm({ prn: '', name: '', gender: 'M', rollNumber: '', semester: '' });
    fetchData();
  };

  const handleAddBiometric = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/biometric/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(biometricForm),
    });
    setBiometricForm({ student: '', biometric: '' });
    fetchData();
  };

  const deleteItem = async (endpoint, id) => {
    if (window.confirm("Permanent deletion! Are you sure?")) {
      await fetch(`${API_BASE}/${endpoint}/${id}/`, { method: 'DELETE' });
      fetchData();
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.prn.includes(searchQuery)
  );
>>>>>>> 86c5c22 (add backend and frontend logic)

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
<<<<<<< HEAD
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg text-white">
              <GraduationCap size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight uppercase italic text-slate-800">Student Hub</h1>
              <p className="text-slate-500 font-medium">Manage Admissions & Biometric Security</p>
            </div>
          </div>
          
          <div className="flex gap-2">
             <button onClick={() => {setListView('hierarchy'); setStudents([])}} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${listView === 'hierarchy' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500'}`}>Drill-down</button>
             <button onClick={fetchAllStudents} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${listView === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}><Globe size={16} className="inline mr-2" /> Global List</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. ENROLLMENT & BIOMETRIC FORMS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h2 className="text-sm font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-indigo-600">
                <UserPlus size={18} /> Enrollment
              </h2>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                  value={selProgForm} onChange={(e) => handleProgChangeForm(e.target.value)} required>
                  <option value="">1. Select Program</option>
                  {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>

                <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold disabled:opacity-40"
                  value={selYearForm} onChange={(e) => handleYearChangeForm(e.target.value)} required disabled={!selProgForm}>
                  <option value="">2. Select Year</option>
                  {formYears.map(y => <option key={y.id} value={y.id}>Year {y.year}</option>)}
                </select>

                <select className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold disabled:opacity-40"
                  value={studentForm.semester} onChange={(e) => setStudentForm({...studentForm, semester: e.target.value})} required disabled={!selYearForm}>
                  <option value="">3. Select Semester</option>
                  {formSemesters.map(s => <option key={s.id} value={s.id}>Semester {s.semester}</option>)}
                </select>

                {/* --- NEW STUDENT DETAILS --- */}
                <div className={`space-y-3 pt-4 border-t border-slate-50 ${!studentForm.semester ? 'opacity-20 pointer-events-none' : ''}`}>
                    <input type="text" placeholder="Student PRN" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                        value={studentForm.prn} onChange={(e) => setStudentForm({...studentForm, prn: e.target.value})} required />
                    
                    <input type="text" placeholder="Full Name" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                        value={studentForm.name} onChange={(e) => setStudentForm({...studentForm, name: e.target.value})} required />

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Gender</label>
                            <select className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                                value={studentForm.gender} onChange={(e) => setStudentForm({...studentForm, gender: e.target.value})}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Roll No</label>
                            <input type="text" placeholder="e.g. 101" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                                value={studentForm.rollNumber} onChange={(e) => setStudentForm({...studentForm, rollNumber: e.target.value})} required />
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 uppercase text-xs tracking-widest flex items-center justify-center gap-2 mt-4">
                        <Save size={16}/> Save Enrollment
                    </button>
                </div>
              </form>
            </div>

            {/* --- BIOMETRIC LINKING FORM --- */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white">
                <h2 className="text-sm font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-indigo-400">
                    <Fingerprint size={18} /> Biometric Registration
                </h2>
                <form onSubmit={handleLinkBiometric} className="space-y-4">
                    <select className="w-full p-3.5 bg-slate-800 border-none rounded-2xl font-bold text-sm text-slate-300 outline-none"
                        // value={biometricForm.studentId} 
                        value={biometricForm.student}
                        onChange={(e) => setBiometricForm({...biometricForm, student: e.target.value})} required>
                        <option value="">Select Student to Link</option>
                        {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.prn})</option>)}
                    </select>
                    <textarea 
                        placeholder="Biometric Tempate will be auto fetched..." 
                        className="w-full p-3.5 bg-slate-800 border-none rounded-2xl font-mono text-xs text-indigo-300 outline-none h-24 resize-none"
                        // value={biometricForm.biometricData}
                        readOnly
                        value={biometricForm.biometric}
                        onChange={(e) => setBiometricForm({...biometricForm, biometric: e.target.value})}
                    />
                    {/* <button className="w-full bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-900/20 uppercase text-xs tracking-widest">
                        Get Biometric Template
                    </button> */}
                  <button 
                      type="submit"
                      className="w-full bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-lg uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                  >
                      {loading ? <Loader2 className="animate-spin" size={16}/> : <BioIcon size={16}/>}
                      {loading ? "Processing..." : "Capture & Link Biometric"}
                  </button>
                </form>
            </div>
          </div>

          {/* 2. HIERARCHICAL LISTING */}
          <div className="lg:col-span-8 space-y-6">
            {listView === 'hierarchy' && (
               <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
                    <select className="w-full p-2.5 bg-transparent border-none font-black text-xs uppercase"
                        value={selProgList} onChange={(e) => handleProgChangeList(e.target.value)}>
                        <option value="">Select Program</option>
                        {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <ChevronRight className="text-slate-300" />
                  <select className="flex-1 min-w-[150px] p-3 bg-slate-50 border-none rounded-xl font-black text-xs uppercase disabled:opacity-30"
                    value={selYearList} onChange={(e) => handleYearChangeList(e.target.value)} disabled={!selProgList}>
                    <option value="">Select Year</option>
                    {listYears.map(y => <option key={y.id} value={y.id}>Year {y.year}</option>)}
                  </select>
                  <ChevronRight className="text-slate-300" />
                  <select className="flex-1 min-w-[150px] p-3 bg-slate-50 border-none rounded-xl font-black text-xs uppercase disabled:opacity-30"
                    value={selSemList} onChange={(e) => fetchStudentsBySemester(e.target.value)} disabled={!selYearList}>
                    <option value="">Select Semester</option>
                    {listSemesters.map(s => <option key={s.id} value={s.id}>Semester {s.semester}</option>)}
                  </select>
               </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Syncing Records...</p>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <Users size={16}/> {listView === 'all' ? 'Comprehensive Database' : 'Filtered Semester View'}
                    </h3>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black">{students.length} Records</span>
                </div>
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    {students.length > 0 ? students.map((student) => (
                      <tr key={student.id} className="hover:bg-indigo-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400 uppercase">
                                {student.name.substring(0,2)}
                             </div>
                             <div>
                                <p className="font-black text-slate-800 text-sm">{student.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">PRN: {student.prn}</p>
                                <p>{student.program}- (Year - {student.year}) - ( Semester - {student.semesterNumber})</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex flex-col items-end gap-1">
                             <span className="text-[10px] font-black text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-md">Roll: {student.rollNumber}</span>
                             <span className="text-[9px] font-bold text-slate-400 uppercase">{student.gender === 'M' ? 'Male' : 'Female'}</span>
                          </div>
                        </td>
                      </tr>
                    )) : (
                        <tr><td className="p-20 text-center text-slate-300 italic font-medium">Please finalize selection to view students.</td></tr>
                    )}
=======
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
>>>>>>> 86c5c22 (add backend and frontend logic)
                  </tbody>
                </table>
              </div>
            )}
          </div>
<<<<<<< HEAD
=======

>>>>>>> 86c5c22 (add backend and frontend logic)
        </div>
      </div>
    </div>
  );
};

export default Student;