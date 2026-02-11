import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Menu, User } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-bubble-100 font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-bubble-200">
                <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-bubble-500 p-2 rounded-full text-white group-hover:animate-bounce transition-transform">
                            <Music size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-bubble-800 tracking-wide">
                            Chante & Apprends
                        </h1>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button className="p-2 bg-bubble-100 rounded-full text-bubble-600 hover:bg-bubble-200 transition-colors">
                            <User size={20} />
                        </button>
                        <button className="p-2 bg-bubble-100 rounded-full text-bubble-600 hover:bg-bubble-200 transition-colors md:hidden">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-20 pb-8 px-4">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white py-6 border-t border-bubble-200">
                <div className="max-w-5xl mx-auto px-4 text-center text-bubble-700 text-sm">
                    <p>© 2024 Chante & Apprends. Learn French with Music!</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
