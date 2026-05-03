<<<<<<< HEAD
import React from 'react';

export default function About() {
    return (
        <div className="py-16 bg-white overflow-hidden">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    {/* Visual Element */}
                    <div className="md:5/12 lg:w-5/12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="CS & IT Collaboration"
                                className="relative rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-3xl text-blue-900 font-bold md:text-4xl">
                            Bridging Academic Tradition with <span className="text-indigo-600">Modern Technology</span>
                        </h2>
                        
                        <p className="mt-6 text-gray-700 leading-relaxed">
                            The **Attendance Management System** is a flagship digital initiative by the Department of Computer Science & IT at Dr. BAMU. Our mission is to eliminate the inefficiencies of manual record-keeping, ensuring that academic data is accurate, accessible, and tamper-proof.
                        </p>

                        <div className="mt-8 space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-none w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 14.535a12.003 12.003 0 0019 0l-1.382-8.551z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">Academic Integrity</h4>
                                    <p className="text-sm text-gray-600">Maintaining high standards of attendance accuracy for B.Voc, BCA, M.Sc, and MCA programs.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-none w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">Instant Analytics</h4>
                                    <p className="text-sm text-gray-600">Providing faculty with real-time insights to identify and support students with low attendance scores.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-4 bg-gray-50 rounded-xl border-l-4 border-blue-900">
                            <h5 className="font-bold text-blue-900">Department Goal:</h5>
                            <p className="text-sm italic text-gray-600">
                                To foster a disciplined learning environment by leveraging the very technologies we teach in our classrooms.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Optional Lower Section: Tech Stack */}
                <div className="mt-20 pt-12 border-t border-gray-100">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 italic">"Knowledge is Power, Information is Liberating."</h3>
                        <p className="mt-4 text-gray-500 uppercase tracking-widest text-xs font-bold">
                            Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar
=======
import React from 'react'

export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            React development is carried out by passionate developers
                        </h2>
                        <p className="mt-6 text-gray-600">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
                            accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
                            aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
                        </p>
                        <p className="mt-4 text-gray-600">
                            Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
                            Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
>>>>>>> 86c5c22 (add backend and frontend logic)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}