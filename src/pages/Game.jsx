import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, XCircle, RefreshCw, Share2, Info } from 'lucide-react';
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
    const [hasValidated, setHasValidated] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null); // For Context Modal

    // Challenge Mode State
    const challengeScore = searchParams.get('score');
    const challengerName = searchParams.get('challenger') || 'A friend';

    // Initial load effect (unchanged)
    useEffect(() => {
        const data = getSongData(id);
        setSong(data);
        // Pass vocabulary to generator
        const initialLyrics = generateBlanks(data.lyrics, data.level, data.vocabulary);

        const lyricsWithState = initialLyrics.map(line => ({
            ...line,
            content: line.content.map(word => ({
                ...word,
                userValue: '',
                isCorrect: false, // Used for internal scoring
            }))
        }));

        setLyrics(lyricsWithState);
        setScore(0);
        setIsComplete(false);
        setHasValidated(false);
    }, [id]);

    // Validation Logic (Triggered manually or at end)
    const validateAnswers = () => {
        if (hasValidated) return;

        let newScore = 0;
        const newLyrics = lyrics.map(line => ({
            ...line,
            content: line.content.map(word => {
                if (!word.isBlank) return word;
                const isCorrect = checkAnswer(word.userValue, word.word);
                if (isCorrect) newScore += 10;
                return { ...word, isCorrect };
            })
        }));

        setLyrics(newLyrics);
        setScore(newScore);
        setHasValidated(true);
        setIsComplete(true);

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Save Score
        if (currentUser) {
            saveScore(currentUser.uid, id, newScore, song.title);
        }
    };

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
        if (hasValidated) return; // Prevent editing after validation

        const newLyrics = [...lyrics];
        const wordObj = newLyrics[lineIndex].content[wordIndex];
        wordObj.userValue = value;
        setLyrics(newLyrics);
    };

    const handleShare = () => {
        const url = `${window.location.origin}/play/${id}?score=${score}&challenger=Friend`;
        const text = `I scored ${score} points on ${song.title}! Can you beat me? play here: ${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!song) return <div className="text-center p-10 font-bold text-bubble-600">Loading Song...</div>;

    const allBlanksFilled = lyrics.length > 0 && lyrics.every(line =>
        line.content.every(w => !w.isBlank || w.userValue.trim().length > 0)
    );

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] lg:h-[calc(100vh-140px)] gap-4 lg:gap-8">

                {/* Mobile: Sticky Top Video / Desktop: Left Column */}
                <div className="flex-none h-[35vh] lg:h-auto lg:w-1/3 flex flex-col gap-4 relative z-20">
                    <Link to="/" className="hidden lg:flex items-center gap-2 text-bubble-600 hover:text-bubble-800 font-bold mb-2 transition-colors">
                        <ArrowLeft size={20} /> Back to Songs
                    </Link>

                    {/* Challenge Banner */}
                    {challengeScore && (
                        <div className="bg-accent-yellow text-bubble-900 p-3 rounded-xl font-bold text-center animate-bounce shadow-md border-2 border-bubble-900">
                            🏆 Challenge: Beat {challengerName}'s score of {challengeScore}!
                        </div>
                    )}

                    <div className="card-bubble p-0 overflow-hidden relative w-full h-full bg-black shadow-xl border-4 border-white rounded-2xl">
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
                </div>

                {/* Lyrics Area */}
                <div className="flex-1 lg:w-2/3 card-bubble overflow-hidden flex flex-col bg-white/95 backdrop-blur-md shadow-inner border-bubble-100 relative">
                    {/* Mobile Header inside Lyrics card */}
                    <div className="lg:hidden flex items-center justify-between mb-4 border-b border-bubble-100 pb-2">
                        <Link to="/" className="text-bubble-600 p-1">
                            <ArrowLeft size={24} />
                        </Link>
                        <h2 className="font-bold text-bubble-800 truncate">{song.title}</h2>
                        <div className="font-bold text-bubble-600">{score} pts</div>
                    </div>

                    <div className="overflow-y-auto flex-grow p-4 lg:p-6 space-y-6 scrollbar-thin scrollbar-thumb-bubble-300 scrollbar-track-transparent pb-32">
                        {lyrics.map((line, lineIndex) => (
                            <div key={lineIndex} className="text-lg md:text-2xl font-medium text-gray-700 leading-loose flex flex-wrap gap-x-2 items-baseline">
                                {line.content.map((item, wordIndex) => {
                                    if (!item.isBlank) {
                                        return <span key={wordIndex} className="select-none">{item.word}</span>;
                                    }

                                    // Render Blank/Input logic
                                    const showResult = hasValidated;
                                    const isCorrect = item.isCorrect;

                                    return (
                                        <div key={wordIndex} className="relative inline-block group mb-2">
                                            {!showResult ? (
                                                <input
                                                    type="text"
                                                    value={item.userValue}
                                                    onChange={(e) => handleInputChange(lineIndex, wordIndex, e.target.value)}
                                                    className={`
                                                        border-b-4 text-center min-w-[3rem] max-w-[8rem] rounded-lg px-2 py-1 transition-all duration-200
                                                        focus:outline-none focus:bg-bubble-50 focus:border-bubble-500
                                                        bg-gray-50 text-gray-800
                                                        ${!item.userValue.trim() ? 'border-accent-yellow/50 bg-accent-yellow/10 animate-pulse' : 'border-gray-300'}
                                                    `}
                                                    style={{ width: `${Math.max(item.word.length * 12, 60)}px` }}
                                                    placeholder="?"
                                                    autoComplete="off"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <span className={`
                                                        px-2 py-1 rounded-lg font-bold border-b-4 text-center min-w-[3rem]
                                                        ${isCorrect
                                                            ? 'bg-green-100 border-green-500 text-green-700'
                                                            : 'bg-red-100 border-red-500 text-red-700 line-through'}
                                                    `}>
                                                        {item.userValue || '-'}
                                                    </span>
                                                    {!isCorrect && (
                                                        <span className="text-sm text-green-600 font-bold mt-1 animate-pop">
                                                            {item.word}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Context/Translation Icon (Review Mode) */}
                                            {showResult && (
                                                <div className="absolute -top-6 -right-2 z-10 cursor-pointer text-bubble-500 hover:text-bubble-700 transition-colors bg-white rounded-full shadow-sm" title="See translation and context">
                                                    <Info size={16} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Footer / Validation Action */}
                    {!hasValidated && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-bubble-200 flex justify-center z-30">
                            <button
                                onClick={validateAnswers}
                                disabled={!allBlanksFilled}
                                className={`
                                    btn-bubble w-full md:w-auto px-12 py-3 text-lg transition-all
                                    ${allBlanksFilled ? 'opacity-100 animate-bounce' : 'opacity-50 grayscale cursor-not-allowed'}
                                `}
                            >
                                {allBlanksFilled
                                    ? '✨ Validate Answers! ✨'
                                    : `${lyrics.reduce((acc, line) => acc + line.content.filter(w => w.isBlank && w.userValue.trim().length === 0).length, 0)} blanks remaining`}
                            </button>
                        </div>
                    )}

                    {/* Result Overlay (Replaces bottom bar when done) */}
                    {hasValidated && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent z-30 flex flex-col items-center">
                            <div className="bg-bubble-100 p-4 rounded-2xl shadow-lg border-2 border-bubble-300 w-full max-w-md text-center animate-pop">
                                <h3 className="text-xl font-bold text-bubble-900 mb-1">Score: {score}</h3>
                                <div className="flex gap-2 justify-center mt-3">
                                    <button onClick={() => window.location.reload()} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-bubble-700 font-bold shadow-sm hover:bg-gray-50">
                                        <RefreshCw size={18} /> Retry
                                    </button>
                                    <button onClick={handleShare} className="flex items-center gap-2 bg-accent-yellow px-4 py-2 rounded-full text-bubble-900 font-bold shadow-sm hover:bg-yellow-300">
                                        <Share2 size={18} /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Context Modal Overlay */}
                    {selectedWord && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedWord(null)}>
                            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-pop border-4 border-bubble-200" onClick={e => e.stopPropagation()}>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-bubble-800 capitalize">{selectedWord.word}</h3>
                                    <button onClick={() => setSelectedWord(null)} className="text-gray-400 hover:text-gray-600">
                                        <XCircle size={24} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-bubble-50 p-3 rounded-xl border border-bubble-100">
                                        <span className="text-xs font-bold text-bubble-400 uppercase tracking-wider block mb-1">Translation</span>
                                        <p className="text-lg text-gray-800 font-medium">{selectedWord.translation}</p>
                                    </div>

                                    <div className="bg-accent-yellow/10 p-3 rounded-xl border border-accent-yellow/20">
                                        <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider block mb-1">Context</span>
                                        <p className="text-gray-700 italic">{selectedWord.context}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedWord(null)}
                                    className="w-full mt-6 py-2 bg-bubble-500 hover:bg-bubble-600 text-white font-bold rounded-xl transition-colors"
                                >
                                    Got it!
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </Layout>
    );
};

export default Game;
