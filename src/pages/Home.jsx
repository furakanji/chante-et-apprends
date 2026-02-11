import React from 'react';
import { Play, Star, Music as MusicNote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

// Mock Data
const SONGS = [
    { id: 1, title: "Papaoutai", artist: "Stromae", level: "A2", color: "bg-accent-pink" },
    { id: 2, title: "Je Veux", artist: "Zaz", level: "B1", color: "bg-accent-purple" },
    { id: 3, title: "La Vie En Rose", artist: "Édith Piaf", level: "B2", color: "bg-accent-orange" },
    { id: 4, title: "Dernière Danse", artist: "Indila", level: "A2", color: "bg-bubble-400" },
    { id: 5, title: "Elle Me Dit", artist: "Mika", level: "B1", color: "bg-accent-yellow" },
    { id: 6, title: "Alors On Danse", artist: "Stromae", level: "A1", color: "bg-accent-pink" },
];

const SongCard = ({ song }) => (
    <Link to={`/play/${song.id}`}>
        <div className="card-bubble group hover:bg-bubble-50 transition-colors cursor-pointer relative overflow-hidden h-full">
            <div className={`absolute top-0 right-0 p-2 ${song.color} rounded-bl-3xl text-white font-bold shadow-md z-10`}>
                {song.level}
            </div>

            <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full ${song.color} flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <MusicNote />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800 leading-tight group-hover:text-bubble-600 transition-colors">
                        {song.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{song.artist}</p>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="flex text-yellow-400 gap-1">
                    {[1, 2, 3].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <button className="p-2 bg-bubble-500 rounded-full text-white shadow-lg transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 hover:bg-bubble-600">
                    <Play size={20} fill="currentColor" />
                </button>
            </div>
        </div>
    </Link>
);

const Home = () => {
    return (
        <Layout>
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-bubble-900 mb-2 font-display">
                    Pick a Song
                </h2>
                <p className="text-bubble-700 text-lg">
                    Master French lyrics with your favorite tunes!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SONGS.map(song => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
        </Layout>
    );
};

export default Home;
