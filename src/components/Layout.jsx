import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
    const { currentUser, loginWithGoogle, logout } = useAuth();

    return (
        <div className="min-h-screen bg-bubble-100 font-sans text-gray-800 relative overflow-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-bubble-200">
                <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/logo.png" alt="MotMotMot Logo" className="w-12 h-12 object-contain group-hover:animate-bounce transition-transform" />
                        <span className="text-2xl font-bold text-bubble-600">MotMotMot</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        {currentUser ? (
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-bubble-200 shadow-sm">
                                <User size={18} className="text-bubble-500" />
                                <span className="text-sm font-medium text-bubble-700">
                                    {currentUser.isAnonymous ? 'Guest' : currentUser.displayName?.split(' ')[0]}
                                </span>
                                {currentUser.isAnonymous && (
                                    <button
                                        onClick={loginWithGoogle}
                                        className="text-xs bg-bubble-500 text-white px-2 py-1 rounded-full hover:bg-bubble-600"
                                    >
                                        Save Progress
                                    </button>
                                )}
                            </div>
                        ) : (
                            <button onClick={loginWithGoogle} className="btn-bubble text-sm py-1 px-4">
                                Sign In
                            </button>
                        )}
                        <button className="p-2 hover:bg-bubble-100 rounded-full transition-colors text-bubble-600">
                            <Menu size={24} />
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
                    <p>© 2025 MotMotMot - A Totally Unnecessary Productions</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
