export const getSongData = (id) => {
    // Mock data - in real app, fetch from Firestore or JSON
    const songData = {
        id,
        title: "Papaoutai",
        artist: "Stromae",
        videoId: "oiKj0Z_Xnjc", // YouTube ID
        lyrics: [
            { time: 14, text: "Dites-moi d'où il vient", type: "line" },
            { time: 16, text: "Enfin je saurai où je vais", type: "line" },
            { time: 19, text: "Maman dit que lorsqu'on cherche bien", type: "line" },
            { time: 23, text: "On finit toujours par trouver", type: "line" },
            { time: 27, text: "Elle dit qu'il n'est jamais très loin", type: "line" },
            { time: 31, text: "Qu'il part très souvent travailler", type: "line" },
            { time: 35, text: "Maman dit travailler c'est bien", type: "line" },
            { time: 39, text: "Bien mieux qu'être mal accompagné", type: "line" },
            { time: 43, text: "Pas vrai ?", type: "line" },
            { time: 45, text: "Où est ton papa ?", type: "chorus" },
            { time: 47, text: "Dis-moi où est ton papa ?", type: "chorus" },
        ],
        vocabulary: {
            "maman": { translation: "Mom / Mother", context: "Informal. 'Mère' is formal." },
            "papa": { translation: "Dad / Father", context: "Informal. 'Père' is formal." },
            "travaille": { translation: "Works", context: "Verb 'Travailler' (to work)." },
            "travailler": { translation: "To work", context: "Infinitive verb." },
            "chercher": { translation: "To look for", context: "Also means 'to search'." },
            "trouver": { translation: "To find", context: "Result of looking for something." },
            "loin": { translation: "Far", context: "Opposite of 'près' (close)." },
            "vient": { translation: "Comes", context: "Verb 'Venir' (to come)." },
            "vais": { translation: "Go", context: "Verb 'Aller' (to go). 'Je vais' = I go." },
            "dit": { translation: "Says", context: "Verb 'Dire' (to say)." },
            "saurai": { translation: "Will know", context: "Future tense of 'Savoir' (to know)." },
            "accompagné": { translation: "Accompanied", context: "Used here as 'with someone'." }
        },
        level: "A2"
    };

    return songData;
};

export const generateBlanks = (lyrics, level, vocabulary = {}) => {
    // Simple blanking logic based on random selection for now
    // Real implementation would use POS tagging or a dictionary

    const difficultyMap = {
        'A1': 0.1, // 10% of words
        'A2': 0.2,
        'B1': 0.3,
        'B2': 0.4,
        'C1': 0.5,
        'C2': 0.6
    };

    const ratio = difficultyMap[level] || 0.2;

    return lyrics.map(line => {
        const words = line.text.split(' ');
        const blankedWords = words.map(word => {
            // Clean word for key lookup (remove punctuation)
            const cleanKey = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
            const contextData = vocabulary[cleanKey];

            // Don't blank short words or punctuation for now
            if (word.length < 3) return { word, isBlank: false, context: contextData };

            return Math.random() < ratio
                ? { word, isBlank: true, value: '', context: contextData }
                : { word, isBlank: false, context: contextData };
        });
        return { ...line, content: blankedWords };
    });
};
