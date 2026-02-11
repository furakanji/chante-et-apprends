import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, XCircle, RefreshCw, Share2 } from 'lucide-react';
import Layout from '../components/Layout';
import { getSongData, generateBlanks } from '../utils/lyricsEngine';
import { checkAnswer } from '../utils/stringUtils';
import confetti from 'canvas-confetti';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Game = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [searchParams] = useSearchParams();
    const [song, setSong] = useState(null);
    const [lyrics, setLyrics] = useState([]);
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Challenge Mode State
    const challengeScore = searchParams.get('score');
    const challengerName = searchParams.get('challenger') || 'A friend';

    useEffect(() => {
        const data = getSongData(id);
        setSong(data);
        const initialLyrics = generateBlanks(data.lyrics, data.level);

        const lyricsWithState = initialLyrics.map(line => ({
            ...line,
            content: line.content.map(word => ({
                ...word,
                userValue: '',
                isCorrect: false,
            }))
        }));

        setLyrics(lyricsWithState);
        setScore(0);
        setIsComplete(false);
    }, [id]);

    useEffect(() => {
        if (lyrics.length > 0) {
            const allBlanks = lyrics.flatMap(l => l.content.filter(w => w.isBlank));
            const allCorrect = allBlanks.every(w => w.isCorrect);
            if (allCorrect && allBlanks.length > 0 && !isComplete) {
                setIsComplete(true);
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                // Save Score
                if (currentUser) {
                    saveScore(currentUser.uid, id, score, song.title);
                }
            }
        }
    }, [lyrics, isComplete, currentUser, id, score, song]);

    const saveScore = async (userId, songId, currentScore, songTitle) => {
        try {
            const userRef = doc(db, 'users', userId);
            const scoreRef = doc(userRef, 'scores', songId);

            // Get existing score to check for high score
            const docSnap = await getDoc(scoreRef);
            const existingData = docSnap.exists() ? docSnap.data() : { highScore: 0 };

            const newHighScore = Math.max(existingData.highScore || 0, currentScore);

            await setDoc(scoreRef, {
                highScore: newHighScore,
                lastScore: currentScore,
                songTitle: songTitle,
                lastPlayed: new Date(),
                attempts: (existingData.attempts || 0) + 1
            }, { merge: true });

            console.log("Score saved!");
        } catch (error) {
            console.error("Error saving score:", error);
        }
    };

    const handleInputChange = (lineIndex, wordIndex, value) => {
        const newLyrics = [...lyrics];
        const wordObj = newLyrics[lineIndex].content[wordIndex];
        wordObj.userValue = value;

        if (checkAnswer(value, wordObj.word)) {
            if (!wordObj.isCorrect) {
                wordObj.isCorrect = true;
                setScore(prev => prev + 10);
            }
        }
        setLyrics(newLyrics);
    };

    const handleShare = () => {
        const url = `${window.location.origin}/play/${id}?score=${score}&challenger=Friend`;
        const text = `I scored ${score} points on ${song.title}! Can you beat me? play here: ${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!song) return <div className="text-center p-10 font-bold text-bubble-600">Loading Song...</div>;

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)]">

                {/* Left: Video & Controls */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-2 text-bubble-600 hover:text-bubble-800 font-bold mb-2 transition-colors">
                        <ArrowLeft size={20} /> Back to Songs
                    </Link>

                    {/* Challenge Banner */}
                    {challengeScore && (
                        <div className="bg-accent-yellow text-bubble-900 p-3 rounded-xl font-bold text-center animate-bounce shadow-md border-2 border-bubble-900">
                            🏆 Challenge: Beat {challengerName}'s score of {challengeScore}!
                        </div>
                    )}

                    <div className="card-bubble p-0 overflow-hidden relative aspect-video bg-black shadow-2xl border-4 border-white">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${song.videoId}?enablejsapi=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                    </div>

                    <div className="card-bubble bg-gradient-to-br from-bubble-400 to-bubble-600 text-white border-none relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold">{song.title}</h2>
                            <p className="opacity-90 font-medium">{song.artist}</p>

                            <div className="mt-6 flex justify-between items-center bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                                <span className="font-bold text-lg">Score</span>
                                <span className="text-3xl font-display font-black tracking-wider animate-pulse">{score}</span>
                            </div>
                        </div>

                        {/* Completion Badge */}
                        {isComplete && (
                            <div className="absolute inset-0 bg-accent-pink/95 flex flex-col items-center justify-center z-20 animate-pop p-6 text-center">
                                <h3 className="text-3xl font-black mb-2 text-white">Bravo!</h3>
                                <p className="font-bold mb-4 text-white/90">You scored {score} points!</p>
                                <div className="flex flex-col gap-3 w-full">
                                    <button onClick={handleShare} className="bg-white text-accent-pink px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg">
                                        <Share2 size={20} />
                                        Challenge a Friend
                                    </button>
                                    <div className="flex gap-2 justify-center">
                                        <Link to="/" className="bg-white/20 text-white px-4 py-2 rounded-full font-bold hover:bg-white/30 transition-colors border border-white/40">
                                            Menu
                                        </Link>
                                        <button onClick={() => window.location.reload()} className="bg-white/20 text-white px-4 py-2 rounded-full font-bold hover:bg-white/30 transition-colors border border-white/40">
                                            <RefreshCw size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Lyrics Stream */}
                <div className="lg:w-2/3 card-bubble overflow-hidden flex flex-col bg-white/90 backdrop-blur-md shadow-inner border-bubble-100 flex-1">
                    <div className="overflow-y-auto flex-grow p-6 space-y-6 scrollbar-thin scrollbar-thumb-bubble-300 scrollbar-track-transparent">
                        {lyrics.map((line, lineIndex) => (
                            <div key={lineIndex} className="text-lg md:text-2xl font-medium text-gray-700 leading-loose flex flex-wrap gap-x-2 items-baseline">
                                {line.content.map((item, wordIndex) => {
                                    if (!item.isBlank) {
                                        return <span key={wordIndex} className="select-none">{item.word}</span>;
                                    }

                                    return (
                                        <div key={wordIndex} className="relative inline-block group">
                                            <input
                                                type="text"
                                                value={item.userValue || ''}
                                                onChange={(e) => handleInputChange(lineIndex, wordIndex, e.target.value)}
                                                className={`
                                border-b-4 text-center min-w-[4rem] w-[${Math.max(item.word.length * 0.8, 4)}rem] rounded-lg px-2 py-1 transition-all duration-300
                                focus:outline-none focus:scale-110
                                ${item.isCorrect
                                                        ? 'bg-green-100 border-green-500 text-green-700 font-bold shadow-[0_0_15px_rgba(74,222,128,0.5)]'
                                                        : 'bg-bubble-50 border-bubble-200 focus:border-bubble-500 focus:bg-white text-bubble-900'}
                            `}
                                                placeholder="?"
                                                disabled={item.isCorrect}
                                            />
                                            {item.isCorrect && (
                                                <span className="absolute -top-3 -right-3 text-green-500 animate-pop">
                                                    <CheckCircle size={16} fill="white" />
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                        <div className="h-40 text-center text-gray-400 italic">
                            (End of Lyrics)
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Game;
