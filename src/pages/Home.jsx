import React, { useState } from 'react';
import { Play, Star, Music as MusicNote, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AddSong from '../components/AddSong';

// Mock Data
const SONGS = [
    { id: 1, title: "Papaoutai", artist: "Stromae", level: "A2", color: "bg-accent-pink" },
    { id: 2, title: "Un Jour Au Mauvais Endroit", artist: "Calogero", level: "B1", color: "bg-accent-purple" },
    { id: 3, title: "N'attendons pas", artist: "Vianney", level: "B2", color: "bg-accent-orange" },
    { id: 4, title: "Dernière Danse", artist: "Indila", level: "A2", color: "bg-bubble-400" },
    { id: 5, title: "Elle Me Dit", artist: "Mika", level: "B1", color: "bg-accent-yellow" },
    { id: 6, title: "Alors On Danse", artist: "Stromae", level: "A1", color: "bg-accent-pink" },
];

const SongCard = ({ song, userScore }) => (
    <Link to={`/play/${song.id}`}>
        <div className="card-bubble group hover:bg-bubble-50 transition-colors cursor-pointer relative overflow-hidden h-full">
            <div className={`absolute top-0 right-0 p-2 ${song.color} rounded-bl-3xl text-white font-bold shadow-md z-10`}>
                {song.level}
            </div>

            {userScore && (
                <div className="absolute top-0 left-0 p-2 bg-yellow-400 rounded-br-3xl text-white font-bold shadow-md z-10 flex items-center gap-1">
                    <Trophy size={16} />
                    {userScore.highScore}
                </div>
            )}

            <div className="flex items-center gap-4 mt-4">
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
                <div className="flex text-yellow-400 gap-1 opacity-50">
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
    const { currentUser } = useAuth();
    const [communitySongs, setCommunitySongs] = useState([]);
    const [showAddSong, setShowAddSong] = useState(false);

    React.useEffect(() => {
        const fetchScores = async () => {
            // ... existing score fetch logic ...
            if (currentUser) {
                try {
                    const scoresRef = collection(db, 'users', currentUser.uid, 'scores');
                    const snapshot = await getDocs(scoresRef);
                    const scores = {};
                    snapshot.forEach(doc => {
                        scores[doc.id] = doc.data();
                    });
                    setUserScores(scores);
                } catch (error) {
                    console.error("Error fetching scores:", error);
                }
            } else {
                setUserScores({});
            }
        };

        const fetchCommunitySongs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'community_songs'));
                const songs = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Use Firestore document ID as the song ID for routing
                    songs.push({
                        id: doc.id,
                        title: data.title,
                        artist: data.artist,
                        level: "Community",
                        color: "bg-bubble-300",
                        isCommunity: true
                    });
                });
                setCommunitySongs(songs);
            } catch (error) {
                console.error("Error fetching community songs:", error);
            }
        };

        fetchScores();
        fetchCommunitySongs();
    }, [currentUser]);

    const handleSongAdded = () => {
        // Refresh list after adding
        // Simplest way is to reload or re-fetch. Let's just re-fetch for now.
        window.location.reload();
    };

    return (
        <Layout>
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-bubble-900 mb-2 font-display">
                    Pick a Song
                </h2>
                <p className="text-bubble-700 text-lg mb-6">
                    Master French lyrics with your favorite tunes!
                </p>

                <button
                    onClick={() => setShowAddSong(true)}
                    className="btn-bubble px-6 py-2 flex items-center gap-2 mx-auto"
                >
                    <MusicNote size={20} />
                    Add Your Own Song
                </button>

                {!currentUser && (
                    <p className="text-sm text-bubble-500 mt-2">
                        Sign in to save your progress 💾
                    </p>
                )}
            </div>

            <div className="mb-12">
                <h3 className="text-2xl font-bold text-bubble-800 mb-6 border-b border-bubble-200 pb-2">Featured Songs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SONGS.map(song => (
                        <SongCard key={song.id} song={song} userScore={userScores[song.id]} />
                    ))}
                </div>
            </div>

            {communitySongs.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-bubble-800 mb-6 border-b border-bubble-200 pb-2">Community Songs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {communitySongs.map(song => (
                            <SongCard key={song.id} song={song} userScore={userScores[song.id]} />
                        ))}
                    </div>
                </div>
            )}

            {showAddSong && (
                <AddSong
                    onClose={() => setShowAddSong(false)}
                    onSongAdded={handleSongAdded}
                />
            )}
        </Layout>
    );
};

export default Home;
