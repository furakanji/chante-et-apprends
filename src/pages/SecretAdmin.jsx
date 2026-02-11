import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Layout from '../components/Layout';
import { Trash2, AlertTriangle, RefreshCw } from 'lucide-react';

const SecretAdmin = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSongs = async () => {
        setLoading(true);
        setError(null);
        try {
            const querySnapshot = await getDocs(collection(db, "community_songs"));
            const songsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSongs(songsList);
        } catch (err) {
            console.error("Error fetching songs:", err);
            setError("Failed to load songs. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleDelete = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
            try {
                await deleteDoc(doc(db, "community_songs", id));
                setSongs(songs.filter(song => song.id !== id));
                alert("Song deleted successfully.");
            } catch (err) {
                console.error("Error deleting song:", err);
                alert("Failed to delete song. Missing permissions?");
            }
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8 border-b border-bubble-200 pb-4">
                    <h1 className="text-3xl font-bold text-bubble-800 flex items-center gap-3">
                        <AlertTriangle className="text-red-500" />
                        Secret Admin Dashboard
                    </h1>
                    <button
                        onClick={fetchSongs}
                        className="btn-bubble px-4 py-2 flex items-center gap-2"
                    >
                        <RefreshCw size={18} /> Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-bubble-500">Loading songs...</div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-bubble-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-bubble-50">
                                    <tr>
                                        <th className="p-4 font-bold text-bubble-600">Title</th>
                                        <th className="p-4 font-bold text-bubble-600">Artist</th>
                                        <th className="p-4 font-bold text-bubble-600">Added By</th>
                                        <th className="p-4 font-bold text-bubble-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-bubble-100">
                                    {songs.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-gray-500">
                                                No community songs found.
                                            </td>
                                        </tr>
                                    ) : (
                                        songs.map(song => (
                                            <tr key={song.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-medium text-gray-800">{song.title}</td>
                                                <td className="p-4 text-gray-600">{song.artist}</td>
                                                <td className="p-4 text-gray-500 text-sm">
                                                    {song.createdBy?.email || "Anonymous"}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(song.id, song.title)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                                                        title="Delete Song"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SecretAdmin;
