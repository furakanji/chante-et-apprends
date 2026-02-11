import { useState } from 'react'
import { Music, Play, User, Menu } from 'lucide-react'

function App() {
    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <div className="bg-bubble-500 p-2 rounded-full text-white animate-bounce">
                        <Music size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-bubble-800 tracking-wide">
                        Chante & Apprends
                    </h1>
                </div>
                <button className="p-2 bg-white rounded-full shadow-md text-bubble-600 hover:scale-110 transition-transform">
                    <Menu size={24} />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto">
                <div className="card-bubble text-center mb-8">
                    <h2 className="text-2xl font-bold text-bubble-900 mb-4">
                        Ready to learn French with music?
                    </h2>
                    <p className="text-bubble-700 mb-6 text-lg">
                        Choose a song and fill in the missing lyrics!
                    </p>

                    <button className="btn-bubble flex items-center justify-center gap-2 mx-auto text-lg">
                        <Play size={20} />
                        Start Playing
                    </button>
                </div>

                {/* Demo Grid just to show off styles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-3xl shadow-md border border-bubble-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent-pink rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-inner">
                            A1
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-700">Beginner Level</h3>
                            <p className="text-sm text-gray-500">Nouns & Verbs</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-3xl shadow-md border border-bubble-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent-purple rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-inner">
                            B1
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-700">Intermediate</h3>
                            <p className="text-sm text-gray-500">Tenses & Grammar</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
