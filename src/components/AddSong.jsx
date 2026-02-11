
import React, { useState } from 'react';
import { validateYoutubeUrl, fetchYoutubeMetadata, isFrench, saveSong, fetchLyrics } from '../utils/communitySongsService';
import { Loader2, Check, AlertCircle, Music } from 'lucide-react';

const AddSong = ({ onClose, onSongAdded }) => {
    const [step, setStep] = useState(1); // 1: URL, 2: Details/Lyrics, 3: Success
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [lyrics, setLyrics] = useState('');
    const [customTitle, setCustomTitle] = useState('');
    const [customArtist, setCustomArtist] = useState('');

    const handleUrlSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const videoId = validateYoutubeUrl(url);
        if (!videoId) {
            setError("Invalid YouTube URL. Please use a standard YouTube link.");
            setIsLoading(false);
            return;
        }

        try {
            const data = await fetchYoutubeMetadata(videoId);
            if (data) {
                setMetadata({ ...data, videoId });
                setCustomTitle(data.title);
                setCustomArtist(data.author_name);

                // Try to fetch lyrics automatically
                const fetchedLyrics = await fetchLyrics(data.author_name, data.title);
                if (fetchedLyrics) {
                    setLyrics(fetchedLyrics);
                }

                setStep(2);
            } else {
                setError("Could not fetch video details. Please check the link.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLyricsSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (lyrics.trim().length < 50) {
            setError("Lyrics are too short. Please paste the full song lyrics.");
            setIsLoading(false);
            return;
        }

        if (!isFrench(lyrics)) {
            setError("The lyrics do not appear to be in French. Please ensure you are submitting a French song.");
            setIsLoading(false);
            return;
        }

        try {
            const songData = {
                title: customTitle,
                artist: customArtist,
                videoId: metadata.videoId,
                lyrics: lyrics,
                originalMetadata: metadata
            };

            await saveSong(songData);
            setStep(3);
            if (onSongAdded) onSongAdded();

            // Auto close after 2 seconds
            setTimeout(() => {
                if (onClose) onClose();
            }, 2000);

        } catch (err) {
            setError("Failed to save the song. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-pop">
                {/* Header */}
                <div className="bg-bubble-100 p-4 flex justify-between items-center border-b border-bubble-200">
                    <h3 className="font-bold text-bubble-800 flex items-center gap-2">
                        <Music size={20} />
                        Add a Song
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <form onSubmit={handleUrlSubmit} className="space-y-4">
                            <p className="text-gray-600 text-sm">Paste a YouTube link to a French song you love!</p>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-bubble-400 focus:outline-none"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !url}
                                className="w-full btn-bubble py-3 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Next'}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleLyricsSubmit} className="space-y-4">
                            <div className="flex gap-4 items-start mb-4 bg-gray-50 p-3 rounded-lg">
                                <img src={metadata.thumbnail_url} alt="Thumbnail" className="w-20 h-16 object-cover rounded-md" />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={customTitle}
                                        onChange={(e) => setCustomTitle(e.target.value)}
                                        className="font-bold text-gray-800 w-full bg-transparent border-b border-transparent focus:border-bubble-300 focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        value={customArtist}
                                        onChange={(e) => setCustomArtist(e.target.value)}
                                        className="text-sm text-gray-600 w-full bg-transparent border-b border-transparent focus:border-bubble-300 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Paste Lyrics (French)</label>
                                <textarea
                                    value={lyrics}
                                    onChange={(e) => setLyrics(e.target.value)}
                                    placeholder="Paste the full song lyrics here..."
                                    className="w-full p-3 border border-gray-300 rounded-xl h-40 focus:ring-2 focus:ring-bubble-400 focus:outline-none text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !lyrics}
                                className="w-full btn-bubble py-3 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Add Song'}
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8 space-y-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                                <Check size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">Song Added!</h4>
                            <p className="text-gray-600">Thanks for contributing to the community.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddSong;
