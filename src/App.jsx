import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'));
const Game = React.lazy(() => import('./pages/Game'));

// Simple Loading Spinner
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-bubble-100">
        <div className="w-16 h-16 border-4 border-bubble-300 border-t-bubble-600 rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <Router>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/play/:id" element={<Game />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
