export const getSongData = (id) => {
    // Mock data - in real app, fetch from Firestore or JSON
    const songs = {
        1: {
            id: 1,
            title: "Papaoutai",
            artist: "Stromae",
            videoId: "oiKj0Z_Xnjc",
            level: "A2",
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
            }
        },
        2: {
            id: 2,
            title: "Je Veux",
            artist: "Zaz",
            videoId: "Tm88QAI8I5k",
            level: "B1",
            lyrics: [
                { time: 10, text: "Donnez-moi une suite au Ritz", type: "line" },
                { time: 12, text: "Je n'en veux pas", type: "line" },
                { time: 14, text: "Des bijoux de chez Chanel", type: "line" },
                { time: 16, text: "Je n'en veux pas", type: "line" },
                { time: 18, text: "Donnez-moi une limousine", type: "line" },
                { time: 20, text: "J'en ferais quoi ?", type: "line" },
                { time: 22, text: "Offrez-moi du personnel", type: "line" },
                { time: 24, text: "J'en ferais quoi ?", type: "line" },
                { time: 26, text: "Un manoir à Neuchâtel", type: "line" },
                { time: 28, text: "Ce n'est pas pour moi", type: "line" },
                { time: 30, text: "Offrez-moi la Tour Eiffel", type: "line" },
                { time: 32, text: "J'en ferais quoi ?", type: "line" },
            ],
            vocabulary: {
                "suite": { translation: "Suite", context: "Luxury hotel room." },
                "veux": { translation: "Want", context: "Verb 'Vouloir' (to want)." },
                "bijoux": { translation: "Jewelry", context: "Plural of 'bijou'." },
                "limousine": { translation: "Limousine", context: "Luxury car." },
                "personnel": { translation: "Staff", context: "Employees/Servants." },
                "manoir": { translation: "Manor", context: "Large country house." },
                "quoi": { translation: "What", context: "Used in questions." }
            }
        },
        3: {
            id: 3,
            title: "La Vie En Rose",
            artist: "Édith Piaf",
            videoId: "ozeqYt3S2e8", // Live version or compatible one
            level: "B2",
            lyrics: [
                { time: 15, text: "Quand il me prend dans ses bras", type: "line" },
                { time: 20, text: "Il me parle tout bas", type: "line" },
                { time: 25, text: "Je vois la vie en rose", type: "line" },
                { time: 30, text: "Il me dit des mots d'amour", type: "line" },
                { time: 35, text: "Des mots de tous les jours", type: "line" },
                { time: 40, text: "Et ça me fait quelque chose", type: "line" },
            ],
            vocabulary: {
                "bras": { translation: "Arms", context: "Body part." },
                "bas": { translation: "Low/Quietly", context: "Speaking softly." },
                "vois": { translation: "See", context: "Verb 'Voir' (to see)." },
                "vie": { translation: "Life", context: "Noun." },
                "rose": { translation: "Pink", context: "The color." },
                "mots": { translation: "Words", context: "Plural of 'mot'." },
                "amour": { translation: "Love", context: "Noun." },
                "chose": { translation: "Thing", context: "Something." }
            }
        },
        4: {
            id: 4,
            title: "Dernière Danse",
            artist: "Indila",
            videoId: "K5KAc5CoCuk",
            level: "A2",
            lyrics: [
                { time: 12, text: "Oh ma douce souffrance", type: "line" },
                { time: 15, text: "Pourquoi s'acharner tu recommences", type: "line" },
                { time: 19, text: "Je ne suis qu'un être sans importance", type: "line" },
                { time: 23, text: "Sans lui je suis un peu parano", type: "line" },
                { time: 27, text: "Je déambule seule dans le métro", type: "line" },
            ],
            vocabulary: {
                "douce": { translation: "Sweet/Soft", context: "Adjective." },
                "souffrance": { translation: "Suffering", context: "Noun." },
                "acharner": { translation: "To persist", context: "Reflexive: s'acharner." },
                "importance": { translation: "Importance", context: "Noun." },
                "sans": { translation: "Without", context: "Preposition." },
                "seule": { translation: "Alone", context: "Adjective (feminine)." },
                "métro": { translation: "Subway", context: "Transportation." }
            }
        }
    };

    return songs[id] || songs[1]; // Default to Papaoutai if not found
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
