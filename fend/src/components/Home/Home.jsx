<<<<<<< HEAD
import React from 'react';
import logo from '../../assets/bamulogo.png'; // Importing your logo

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <header className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 space-y-8">
                    <div className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                            Dr. Babasaheb Ambedkar Marathwada University
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="BAMU Logo" className="h-20 w-auto" />
                        <div className="h-16 w-[2px] bg-gray-200"></div>
                        <h2 className="text-xl font-bold text-blue-900 uppercase">
                            CS & IT <br /> Department
                        </h2>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Advancing <span className="text-blue-800">Digital Governance</span> in Education.
                    </h2>
                    
                    <div className="space-y-4 text-lg text-gray-600 max-w-lg">
                        <p>
                            The Department of Computer Science and Information Technology stands as a pillar of excellence at Dr. BAMU. This attendance system is part of our ongoing commitment to integrating high-level automation into departmental administration.
                        </p>
                        <p className="text-base">
                            By leveraging modern web technologies, we ensure that academic tracking is transparent, efficient, and data-driven—allowing faculty to focus more on pedagogy and less on paperwork.
                        </p>
                    </div>

                    {/* Department Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-sm font-semibold text-gray-700">NAAC A+ Accredited University</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-sm font-semibold text-gray-700">Advanced Research Hub</span>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                    <div className="relative">
                        {/* Decorative circle background */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        
                        <div className="relative bg-white p-2 rounded-2xl shadow-2xl border border-gray-100">
                            <img 
                                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="CS Department Environment" 
                                className="rounded-xl w-full max-w-md shadow-inner"
                            />
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-100">
                                <p className="text-xs font-bold text-blue-900 uppercase tracking-tighter">System Status</p>
                                <p className="text-sm text-green-600 font-medium">● Operational & Secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Original Stats / Quick Info */}
            <section className="py-12">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <h4 className="text-3xl font-bold text-blue-900">CS & IT</h4>
                        <p className="text-gray-500 text-sm">Focus Department</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-3xl font-bold text-blue-900">100%</h4>
                        <p className="text-gray-500 text-sm">Paperless Process</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-3xl font-bold text-blue-900">Secure</h4>
                        <p className="text-gray-500 text-sm">Internal Access</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-3xl font-bold text-blue-900">Scaleable</h4>
                        <p className="text-gray-500 text-sm">Cloud Ready</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
=======
import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            Download Now
                            <span className="hidden sm:block text-4xl">Lorem Ipsum</span>
                        </h2>

                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/"
                        >
                            <svg
                                fill="white"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                            </svg>
                            &nbsp; Download now
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                    <img className="w-96" src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="image1" />
                </div>
            </aside>

            <div className="grid  place-items-center sm:mt-20">
                <img className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>

            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Lorem Ipsum Yojo</h1>
        </div>
    );
}
>>>>>>> 86c5c22 (add backend and frontend logic)
