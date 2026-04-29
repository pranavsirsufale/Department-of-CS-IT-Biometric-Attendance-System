// import React from 'react'
// import { Link, NavLink } from 'react-router-dom';
// import logoImg from '../../assets/bamulogo.png'

// export default function Header() {
//   return (
//       <header className="shadow sticky z-50 top-0">
//           <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
//               <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//                   <Link to="/" className="flex items-center">
//                       <img
//                           src={logoImg}
//                           className="mr-3 h-12"
//                           alt="Logo"
//                       />
//                   </Link>
//                   <div className="flex items-center lg:order-2">
//                       <Link
//                           to="/login"
//                           className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                       >
//                           Log in
//                       </Link>
//                       {/* <Link
//                           to="#"
//                           className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                       >
//                           Get started
//                       </Link> */}
//                   </div>
//                   <div
//                       className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
//                       id="mobile-menu-2"
//                   >
//                       <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//                           <li>
//                               <NavLink to='/'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Home
//                               </NavLink>
//                           </li>

//                            <li>
//                               <NavLink to='/academic-timeline'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Academic Timeline
//                               </NavLink>
//                           </li>

//                            <li>
//                               <NavLink to='/class-type'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Class and Subject
//                               </NavLink>
//                           </li>

// {/* 
//                           <li>
//                               <NavLink to='/university'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   University
//                               </NavLink>
//                           </li>

//                            <li>
//                               <NavLink to='/discipline'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Discipline
//                               </NavLink>
//                           </li>

//                            <li>
//                               <NavLink to='/department'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Department
//                               </NavLink>
//                           </li>

//                            <li>
//                               <NavLink to='/academic-level'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Academic Level
//                               </NavLink>
//                           </li> */}

//                            <li>
//                               <NavLink to='/program'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Program
//                               </NavLink>
//                           </li>

//                            <li>
//                               <NavLink to='/staff'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Staff
//                               </NavLink>
//                           </li>

//                            <li>
//                               <NavLink to='/student'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Student
//                               </NavLink>
//                           </li>


//                            <li>
//                               <NavLink to='/timetable'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Timetable
//                               </NavLink>
//                           </li>

//                           <li>
//                               <NavLink to='/about'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   About
//                               </NavLink>
//                           </li>
//                           <li>
//                               <NavLink to='/contactus'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Contact Us
//                               </NavLink>
//                           </li>
//                           <li>
//                               <NavLink to='/user'
//                                   className={({isActive}) =>
//                                       `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   User
//                               </NavLink>
//                           </li>
//                           <li>
//                             <NavLink to='/github' className={({isActive})=>`
//                             block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700": "text-gray-700"} border-b border-x-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0` } >
//                                 Github
//                             </NavLink>
//                           </li>

                          
                          
//                       </ul>
//                   </div>
//               </div>
//           </nav>
//       </header>
//   );
// }


// ##################

import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown, Shield, UserCircle } from 'lucide-react';
import logoImg from '../../assets/bamulogo.png'

export default function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')) || null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem('accessToken'));
            setUser(JSON.parse(localStorage.getItem('userData')));
        };

        window.addEventListener('authChange', checkAuth);
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('authChange', checkAuth);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Clear all auth data
        window.dispatchEvent(new Event('authChange'));
        navigate('/login');
    };

    // Helper to check roles (Assuming your Django User/Teacher model has an 'isAdmin' or 'role' field)
    const isAdmin = user?.isAdmin || user?.role === 'admin' || user?.role === 'HOD';

    return (
        <header className="shadow sticky z-50 top-0 bg-white">
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img src={logoImg} className="mr-3 h-12" alt="Logo" />
                    </Link>

                    {/* Right Side: Auth / Profile */}
                    <div className="flex items-center lg:order-2 relative" ref={dropdownRef}>
                        {!isLoggedIn ? (
                            <Link to="/login" className="text-white bg-indigo-900 hover:bg-indigo-800 font-bold rounded-xl text-sm px-6 py-2.5 transition-all">
                                Log in
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-50 rounded-full border border-slate-100 transition-all"
                                >
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
                                        <User size={20} />
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-xs font-bold text-slate-800 leading-none">{user?.name || "User"}</p>
                                        <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">{isAdmin ? 'Admin / HOD' : 'Teacher'}</p>
                                    </div>
                                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Profile Dropdown Menu */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 top-14 w-56 bg-white border border-slate-100 shadow-2xl rounded-2xl py-2 z-[100] animate-in fade-in zoom-in-95 duration-100">
                                        <div className="px-4 py-3 border-b border-slate-50">
                                            <p className="text-sm font-bold text-slate-800">{user?.email}</p>
                                            <p className="text-[10px] text-indigo-600 font-black tracking-widest uppercase mt-0.5">Active Session</p>
                                        </div>
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                                            <UserCircle size={18} /> My Profile
                                        </Link>
                                        {isAdmin && (
                                            <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                                                <Shield size={18} /> Admin Settings
                                            </Link>
                                        )}
                                        <hr className="my-1 border-slate-50" />
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                            <LogOut size={18} /> Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {/* <li><NavLink to='/' className={({isActive}) => `block py-2 ${isActive ? "text-indigo-700" : "text-gray-700"} hover:text-indigo-700 lg:p-0 transition-colors`}>Home</NavLink></li> */}

                            {isLoggedIn && (
                                <>
                                    {/* ADMIN / HOD ONLY LINKS */}
                                    {isAdmin && (
                                        <>

                           <li>
                              <NavLink to='/academic-timeline'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Academic Timeline
                              </NavLink>
                          </li>

                           <li>
                              <NavLink to='/class-type'
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Class and Subject
                              </NavLink>
                          </li>
                                            <li><NavLink to='/staff' className={({isActive}) => `block py-2 ${isActive ? "text-indigo-700" : "text-gray-700"} lg:p-0`}>Manage Staff</NavLink></li>
                                            <li><NavLink to='/program' className={({isActive}) => `block py-2 ${isActive ? "text-indigo-700" : "text-gray-700"} lg:p-0`}>Programs</NavLink></li>
                                        </>
                                    )}

                                    {/* SHARED LINKS (Visible to both) */}
                                    <li><NavLink to='/timetable' className={({isActive}) => `block py-2 ${isActive ? "text-indigo-700" : "text-gray-700"} lg:p-0`}>Timetable</NavLink></li>
                                    <li><NavLink to='/student' className={({isActive}) => `block py-2 ${isActive ? "text-indigo-700" : "text-gray-700"} lg:p-0`}>Students</NavLink></li>
                                    <li><NavLink to='/teacher-session' className={({isActive}) => `block py-2 ${isActive ? "text-indigo-700" : "text-gray-700"} lg:p-0`}>My Session</NavLink></li>
                                </>
                            )}

                            {/* <li><NavLink to='/about' className={({isActive}) => `block py-2 ${isActive ? "text-indigo-700" : "text-gray-700"} lg:p-0`}>About</NavLink></li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}