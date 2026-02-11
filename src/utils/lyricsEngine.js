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
            title: "Un Jour Au Mauvais Endroit",
            artist: "Calogero",
            videoId: "W0xjW-e4KEg",
            level: "B1",
            lyrics: [
                { time: 18, text: "Échirolles centre, banlieue sud de Grenoble", type: "line" },
                { time: 22, text: "Je m'appelle Sofiane, j'ai 20 ans", type: "line" },
                { time: 25, text: "Kevin c'est mon pote, on est inséparables", type: "line" },
                { time: 29, text: "J'ai un job, moi je vis simplement", type: "line" },
                { time: 33, text: "Le soir à Villeneuve, les grands frères et les gosses", type: "line" },
                { time: 37, text: "Les terrains de foot et la boxe", type: "line" },
                { time: 40, text: "Qui a eu tort ? La raison du plus fort", type: "line" },
                { time: 44, text: "Pour un regard en croix je suis mort", type: "line" },
                { time: 48, text: "Toi mon frère dis-moi pourquoi", type: "chorus" },
                { time: 52, text: "La vie continue sans moi ?", type: "chorus" },
                { time: 55, text: "Dis-moi pourquoi j'étais là ?", type: "chorus" },
                { time: 59, text: "Un jour au mauvais endroit", type: "chorus" },
                { time: 63, text: "Les cafés, les cinémas", type: "chorus" },
                { time: 66, text: "Je n'y retournerai pas", type: "chorus" },
                { time: 70, text: "Ma vie s'est arrêtée là", type: "chorus" },
                { time: 74, text: "Un jour au mauvais endroit", type: "chorus" },
            ],
            vocabulary: {
                "banlieue": { translation: "Suburbs", context: "Outskirts of a city." },
                "pote": { translation: "Mate/Buddy", context: "Informal for friend." },
                "inséparables": { translation: "Inseparable", context: "Always together." },
                "gosses": { translation: "Kids", context: "Informal for children." },
                "tort": { translation: "Wrong", context: "Avoir tort (to be wrong)." },
                "croix": { translation: "Cross", context: "Regard en croix (dirty look)." },
                "endroit": { translation: "Place", context: "Location." }
            }
        },
        3: {
            id: 3,
            title: "N'attendons pas",
            artist: "Vianney",
            videoId: "8nUd4IId9l0",
            level: "B2",
            lyrics: [
                { time: 8, text: "Il est lundi maudit matin", type: "line" },
                { time: 11, text: "Ce que je fais ne me plaît pas", type: "line" },
                { time: 14, text: "C'est décidé d'ici demain", type: "line" },
                { time: 17, text: "C'est plus moi", type: "line" },
                { time: 22, text: "Il est parti l'amour au loin", type: "line" },
                { time: 26, text: "J'en ai pleuré pendant des siècles", type: "line" },
                { time: 29, text: "C'est décidé d'ici demain", type: "line" },
                { time: 32, text: "Je m'arrête", type: "line" },
                { time: 36, text: "Je fais de la vie mon drapeau", type: "chorus" },
                { time: 39, text: "Je vois la vie comme un cadeau", type: "chorus" },
                { time: 43, text: "On n'a pas le temps de se lasser", type: "chorus" },
                { time: 47, text: "On n'a pas le temps de se tasser", type: "chorus" },
                { time: 50, text: "N'attendons pas de vivre", type: "chorus" },
                { time: 54, text: "N'attendons pas de vivre", type: "chorus" },
            ],
            vocabulary: {
                "maudit": { translation: "Cursed", context: "Damned/Bad." },
                "plaît": { translation: "Please", context: "Plaire (to please/like)." },
                "siècles": { translation: "Centuries", context: "Very long time." },
                "drapeau": { translation: "Flag", context: "Symbol/Banner." },
                "cadeau": { translation: "Gift", context: "Present." },
                "lasser": { translation: "Get bored/tired", context: "Se lasser." },
                "tasser": { translation: "Settle/Pack down", context: "Se tasser (slouch/stagnate)." },
                "vivre": { translation: "To live", context: "Etre en vie." }
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
        },
        5: {
            id: 5,
            title: "Elle Me Dit",
            artist: "Mika",
            videoId: "NiHWwKC8WjU",
            level: "B1",
            lyrics: [
                { time: 18, text: "Elle me dit écris une chanson contente", type: "line" },
                { time: 22, text: "Pas une chanson déprimante", type: "line" },
                { time: 25, text: "Une chanson que tout le monde aime", type: "line" },
                { time: 30, text: "Elle me dit tu deviendras milliardaire", type: "line" },
                { time: 34, text: "Tu auras de quoi être fier", type: "line" },
                { time: 37, text: "Ne finis pas comme ton père", type: "line" },
            ],
            vocabulary: {
                "écris": { translation: "Write", context: "Imperative 'Écrire'." },
                "contente": { translation: "Happy", context: "Adjective." },
                "déprimante": { translation: "Depressing", context: "Adjective." },
                "aime": { translation: "Likes/Loves", context: "Verb 'Aimer'." },
                "milliardaire": { translation: "Billionaire", context: "Noun." },
                "fier": { translation: "Proud", context: "Adjective." },
                "père": { translation: "Father", context: "Noun." }
            }
        },
        6: {
            id: 6,
            title: "Alors On Danse",
            artist: "Stromae",
            videoId: "VHoT4N43jK8",
            level: "A1",
            lyrics: [
                { time: 47, text: "Alors on danse", type: "chorus" },
                { time: 49, text: "Alors on danse", type: "chorus" },
                { time: 51, text: "Alors on danse", type: "chorus" },
                { time: 55, text: "Qui dit étude dit travail", type: "line" },
                { time: 57, text: "Qui dit taf te dit les thunes", type: "line" },
                { time: 59, text: "Qui dit argent dit dépenses", type: "line" },
                { time: 61, text: "Qui dit crédit dit créance", type: "line" },
            ],
            vocabulary: {
                "danse": { translation: "Dance", context: "Verb 'Danser'." },
                "étude": { translation: "Study", context: "Noun." },
                "travail": { translation: "Work", context: "Noun." },
                "taf": { translation: "Job/Work", context: "Slang for 'Travail'." },
                "thunes": { translation: "Money", context: "Slang for 'Argent'." },
                "argent": { translation: "Money", context: "Noun." },
                "dépenses": { translation: "Expenses", context: "Noun." }
            }
        }
    };

    return songs[id] || null; // Return null if not found to allow Firestore fetch
};

export const INITIAL_SONGS = [
    { id: 1, title: "Papaoutai", artist: "Stromae", level: "A2", color: "bg-accent-pink" },
    { id: 2, title: "Un Jour Au Mauvais Endroit", artist: "Calogero", level: "B1", color: "bg-accent-purple" },
    { id: 3, title: "N'attendons pas", artist: "Vianney", level: "B2", color: "bg-accent-orange" },
    { id: 4, title: "Dernière Danse", artist: "Indila", level: "A2", color: "bg-bubble-400" },
    { id: 5, title: "Elle Me Dit", artist: "Mika", level: "B1", color: "bg-accent-yellow" },
    { id: 6, title: "Alors On Danse", artist: "Stromae", level: "A1", color: "bg-accent-pink" },
];

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
