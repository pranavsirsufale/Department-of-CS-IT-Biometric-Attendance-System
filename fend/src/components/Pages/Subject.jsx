<<<<<<< HEAD
=======
// import React, { useState, useEffect } from 'react';
// import { Book, Plus, Trash2, Loader2, BookmarkCheck, Laptop, FileText, ChevronRight, Hash } from 'lucide-react';

// const Subject = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [classTypes, setClassTypes] = useState([]);
//   const [programs, setPrograms] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Forms
//   const [subjectForm, setSubjectForm] = useState({ name: '', program: '', semester: '' });
//   const [classTypeForm, setClassTypeForm] = useState({ subject: '', code: '', type: 0 });

//   const API_BASE = 'http://127.0.0.1:8000/api/v1';

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [subRes, progRes, semRes, classRes] = await Promise.all([
//         fetch(`${API_BASE}/subject/`),
//         fetch(`${API_BASE}/program/`),
//         fetch(`${API_BASE}/semester/`),
//         fetch(`${API_BASE}/class-type/`)
//       ]);
//       setSubjects(await subRes.json());
//       setPrograms(await progRes.json());
//       setSemesters(await semRes.json());
//       setClassTypes(await classRes.json());
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddSubject = async (e) => {
//     e.preventDefault();
//     await fetch(`${API_BASE}/subject/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(subjectForm),
//     });
//     setSubjectForm({ name: '', program: '', semester: '' });
//     fetchData();
//   };

//   const handleAddClassType = async (e) => {
//     e.preventDefault();
//     await fetch(`${API_BASE}/class-type/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(classTypeForm),
//     });
//     setClassTypeForm({ subject: '', code: '', type: 0 });
//     fetchData();
//   };

//   const deleteClassType = async (id) => {
//     if (window.confirm("Remove this delivery mode?")) {
//       await fetch(`${API_BASE}/class-type/${id}/`, { method: 'DELETE' });
//       fetchData();
//     }
//   };

//   const deleteSubject = async (id) => {
//     if (window.confirm("Delete subject and all associated class types?")) {
//       await fetch(`${API_BASE}/subject/${id}/`, { method: 'DELETE' });
//       fetchData();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-10">
//           <div className="bg-cyan-600 p-3 rounded-2xl shadow-lg shadow-cyan-100 text-white">
//             <Book size={32} />
//           </div>
//           <div>
//             <h1 className="text-3xl font-black text-slate-800 tracking-tight">Subject Tree</h1>
//             <p className="text-slate-500 font-medium">Map academic subjects to their specific delivery modes</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
//           {/* Sidebars for Forms */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Subject Form */}
//             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
//               <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
//                 <Plus size={16} className="text-cyan-600" /> New Subject
//               </h2>
//               <form onSubmit={handleAddSubject} className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Subject Name"
//                   className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
//                   value={subjectForm.name}
//                   onChange={(e) => setSubjectForm({...subjectForm, name: e.target.value})}
//                   required
//                 />
//                 <select 
//                   className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
//                   value={subjectForm.program}
//                   onChange={(e) => setSubjectForm({...subjectForm, program: e.target.value})}
//                   required
//                 >
//                   <option value="">Program...</option>
//                   {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
//                 </select>
//                 <select 
//                   className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
//                   value={subjectForm.semester}
//                   onChange={(e) => setSubjectForm({...subjectForm, semester: e.target.value})}
//                   required
//                 >
//                   <option value="">Semester...</option>
//                   {semesters.map(s => <option key={s.id} value={s.id}>Sem {s.semester}</option>)}
//                 </select>
//                 <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition text-sm">
//                   Register Subject
//                 </button>
//               </form>
//             </div>

//             {/* Class Type Form */}
//             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
//               <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
//                 <BookmarkCheck size={16} className="text-cyan-600" /> New Delivery Mode
//               </h2>
//               <form onSubmit={handleAddClassType} className="space-y-4">
//                 <select 
//                   className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
//                   value={classTypeForm.subject}
//                   onChange={(e) => setClassTypeForm({...classTypeForm, subject: e.target.value})}
//                   required
//                 >
//                   <option value="">Attach to Subject...</option>
//                   {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
//                 </select>
//                 <input
//                   type="text"
//                   placeholder="Mode Code (e.g. TH-01)"
//                   className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
//                   value={classTypeForm.code}
//                   onChange={(e) => setClassTypeForm({...classTypeForm, code: e.target.value})}
//                   required
//                 />
//                 <div className="flex gap-2">
//                   {[0, 1].map((t) => (
//                     <button 
//                       key={t}
//                       type="button"
//                       onClick={() => setClassTypeForm({...classTypeForm, type: t})}
//                       className={`flex-1 py-2 rounded-lg font-bold text-[10px] transition uppercase ${classTypeForm.type === t ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}
//                     >
//                       {t === 0 ? 'Theory' : 'Practical'}
//                     </button>
//                   ))}
//                 </div>
//                 <button className="w-full bg-cyan-100 text-cyan-700 hover:bg-cyan-200 font-bold py-3 rounded-xl transition text-sm">
//                   Add to Subject
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Tree Visualization Section */}
//           <div className="lg:col-span-3 space-y-4">
//             {loading ? (
//               <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan-600 w-12 h-12" /></div>
//             ) : (
//               subjects.map((sub) => (
//                 <div key={sub.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-cyan-200 transition-all">
//                   {/* Parent: Subject Row */}
//                   <div className="p-5 flex items-center justify-between bg-white">
//                     <div className="flex items-center gap-4">
//                       <div className="bg-slate-100 p-2 rounded-xl group-hover:bg-cyan-50 transition-colors">
//                         <Book className="text-slate-400 group-hover:text-cyan-600" size={20} />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-bold text-slate-800">{sub.name}</h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border">
//                             {programs.find(p => p.id === sub.program)?.name || 'General'}
//                           </span>
//                           <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">
//                             Sem {semesters.find(s => s.id === sub.semester)?.semester || '?'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={() => deleteSubject(sub.id)}
//                       className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>

//                   {/* Children: Class Type Rows */}
//                   <div className="bg-slate-50/50 border-t border-slate-100 p-4 space-y-2">
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2 flex items-center gap-2">
//                        <ChevronRight size={12} /> Delivery Modes
//                     </p>
                    
//                     {classTypes.filter(ct => ct.subject === sub.id).length > 0 ? (
//                       classTypes.filter(ct => ct.subject === sub.id).map(ct => (
//                         <div key={ct.id} className="flex items-center justify-between bg-white border border-slate-100 p-3 rounded-2xl ml-4 shadow-sm hover:ring-2 hover:ring-cyan-50 transition-all">
//                           <div className="flex items-center gap-3">
//                             {ct.type === 1 ? (
//                               <Laptop className="text-cyan-600" size={16} />
//                             ) : (
//                               <FileText className="text-amber-500" size={16} />
//                             )}
//                             <div className="flex flex-col">
//                               <span className="text-xs font-bold text-slate-700">
//                                 {ct.type === 1 ? 'Practical' : 'Theory'} Session
//                               </span>
//                               <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
//                                 <Hash size={10} /> {ct.code}
//                               </span>
//                             </div>
//                           </div>
//                           <button 
//                             onClick={() => deleteClassType(ct.id)}
//                             className="p-1.5 text-slate-300 hover:text-red-500 transition"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-[10px] italic text-slate-400 ml-4 py-2">No delivery modes defined for this subject.</p>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Subject;




























// #####something

>>>>>>> 86c5c22 (add backend and frontend logic)
import React, { useState, useEffect } from 'react';
import { Book, Plus, Trash2, Loader2, BookmarkCheck, Laptop, FileText, Beaker, Hash, Settings2, Activity } from 'lucide-react';

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [deliveryModes, setDeliveryModes] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Forms
  const [subjectForm, setSubjectForm] = useState({ name: '', program: '', semester: '' });
  const [classTypeForm, setClassTypeForm] = useState({ subject: '', code: '', deliverymode: '' });
  const [modeForm, setModeForm] = useState({ mode: '' }); // Form for new DeliveryMode

  const API_BASE = 'http://127.0.0.1:8000/api/v1';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subRes, progRes, semRes, classRes, modeRes] = await Promise.all([
        fetch(`${API_BASE}/subject/`),
        fetch(`${API_BASE}/program/`),
        fetch(`${API_BASE}/semester/`),
        fetch(`${API_BASE}/class-type/`),
        fetch(`${API_BASE}/delivery-mode/`)
      ]);
      
      setSubjects(await subRes.json());
      setPrograms(await progRes.json());
      setSemesters(await semRes.json());
      setClassTypes(await classRes.json());
      setDeliveryModes(await modeRes.json());
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Global Delivery Mode (e.g., Theory, Practical)
  const handleAddDeliveryMode = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/delivery-mode/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modeForm),
    });
    setModeForm({ mode: '' });
    fetchData();
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/subject/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subjectForm),
    });
    setSubjectForm({ name: '', program: '', semester: '' });
    fetchData();
  };

  const handleAddClassType = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/class-type/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classTypeForm),
    });
    setClassTypeForm({ subject: '', code: '', deliverymode: '' });
    fetchData();
  };

  const deleteItem = async (endpoint, id) => {
    if (window.confirm("Confirm deletion?")) {
      await fetch(`${API_BASE}/${endpoint}/${id}/`, { method: 'DELETE' });
      fetchData();
    }
  };

  const getModeIcon = (modeName) => {
    const name = modeName?.toLowerCase() || '';
    if (name.includes('theory')) return <FileText size={16} className="text-amber-600" />;
    if (name.includes('pract')) return <Laptop size={16} className="text-indigo-600" />;
    if (name.includes('research')) return <Beaker size={16} className="text-emerald-600" />;
    return <Settings2 size={16} className="text-slate-400" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-cyan-800 p-3 rounded-2xl shadow-lg text-white">
            <Book size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Curriculum Registry</h1>
            <p className="text-slate-500 font-medium">Define modes, subjects, and delivery links</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FORMS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* 0. ADD GLOBAL DELIVERY MODE */}
<<<<<<< HEAD
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 ring-2 ring-indigo-50">
=======
            {/* <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 ring-2 ring-indigo-50">
>>>>>>> 86c5c22 (add backend and frontend logic)
              <h2 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest text-indigo-600">
                <Activity size={16} /> 0. Register Global Mode
              </h2>
              <form onSubmit={handleAddDeliveryMode} className="space-y-3">
                <input
                  type="text"
                  placeholder="e.g. Theory, Research"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  value={modeForm.mode}
                  onChange={(e) => setModeForm({ mode: e.target.value })}
                  required
                />
                <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl transition hover:bg-indigo-700 text-sm">
                  Add to Global List
                </button>
              </form>
<<<<<<< HEAD
            </div>
=======
            </div> */}
>>>>>>> 86c5c22 (add backend and frontend logic)

            {/* 1. ADD SUBJECT FORM */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Plus size={16} className="text-cyan-600" /> 1. New Subject
              </h2>
              <form onSubmit={handleAddSubject} className="space-y-3">
                <input
                  type="text"
                  placeholder="Subject Name"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  value={subjectForm.name}
                  onChange={(e) => setSubjectForm({...subjectForm, name: e.target.value})}
                  required
                />
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  value={subjectForm.program} onChange={(e) => setSubjectForm({...subjectForm, program: e.target.value})} required>
                  <option value="">Program</option>
                  {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  value={subjectForm.semester} onChange={(e) => setSubjectForm({...subjectForm, semester: e.target.value})} required>
                  <option value="">Semester</option>
<<<<<<< HEAD
                  {semesters.map(s => <option key={s.id} value={s.id}>Sem {s.semester} - ({s.programName})</option>)}
=======
                  {semesters.map(s => <option key={s.id} value={s.id}>Sem {s.semester}</option>)}
>>>>>>> 86c5c22 (add backend and frontend logic)
                </select>
                <button className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl transition hover:bg-slate-900 text-sm">
                  Save Subject
                </button>
              </form>
            </div>

            {/* 2. ASSIGN DELIVERY MODE */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <BookmarkCheck size={16} className="text-cyan-600" /> 2. Assign Delivery
              </h2>
              <form onSubmit={handleAddClassType} className="space-y-3">
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  value={classTypeForm.subject} onChange={(e) => setClassTypeForm({...classTypeForm, subject: e.target.value})} required>
                  <option value="">Target Subject</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input type="text" placeholder="Class Code" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  value={classTypeForm.code} onChange={(e) => setClassTypeForm({...classTypeForm, code: e.target.value})} required />
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none font-bold text-cyan-700"
                  value={classTypeForm.deliverymode} onChange={(e) => setClassTypeForm({...classTypeForm, deliverymode: e.target.value})} required>
                  <option value="">Select Mode...</option>
                  {deliveryModes.map(m => <option key={m.id} value={m.id}>{m.mode}</option>)}
                </select>
                <button className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl transition hover:bg-cyan-700 text-sm">
                  Link Delivery Mode
                </button>
              </form>
            </div>
          </div>

          {/* MAIN VIEW */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan-600 w-10 h-10" /></div>
            ) : subjects.map((sub) => (
              <div key={sub.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-cyan-200 transition-all">
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-cyan-700">
                      <Book size={20} />
                    </div>
                    <div>
<<<<<<< HEAD
                      <h3 className="font-extrabold text-slate-800 departmenttext-lg">{sub.name}</h3>
=======
                      <h3 className="font-extrabold text-slate-800 text-lg">{sub.name}</h3>
>>>>>>> 86c5c22 (add backend and frontend logic)
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {programs.find(p => p.id === sub.program)?.name} • Sem {semesters.find(s => s.id === sub.semester)?.semester}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => deleteItem('subject', sub.id)} className="text-slate-200 hover:text-red-500 p-2 transition">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="bg-slate-50/50 p-5 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {classTypes.filter(ct => ct.subject === sub.id).map(ct => {
                      const modeObj = deliveryModes.find(m => m.id === ct.deliverymode);
                      return (
                        <div key={ct.id} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-sm group/item">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-50 rounded-xl">{getModeIcon(modeObj?.mode)}</div>
                            <div>
                              <p className="text-[10px] font-black uppercase text-slate-700 tracking-tight">{modeObj?.mode || 'Unknown'}</p>
                              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest"><Hash size={10} /> {ct.code}</div>
                            </div>
                          </div>
                          <button onClick={() => deleteItem('class-type', ct.id)} className="text-slate-200 hover:text-red-500 transition opacity-0 group-hover/item:opacity-100"><Trash2 size={14} /></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;