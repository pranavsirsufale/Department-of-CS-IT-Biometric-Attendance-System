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