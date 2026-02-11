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
            videoId: "W0xjW-e4KEg",
            level: "B1",
            lyrics: [
                { time: 5, text: "Donnez-moi une suite au Ritz, je n'en veux pas !", type: "line" },
                { time: 8, text: "Des bijoux de chez Chanel, je n'en veux pas !", type: "line" },
                { time: 11, text: "Donnez-moi une limousine, j'en ferais quoi ?", type: "line" },
                { time: 14, text: "Offrez-moi du personnel, j'en ferais quoi ?", type: "line" },
                { time: 17, text: "Un manoir à Neuchâtel, c'est pas pour moi !", type: "line" },
                { time: 20, text: "Offrez-moi la Tour Eiffel, j'en ferais quoi ?", type: "line" },
                { time: 24, text: "Je veux d'l'amour, d'la joie, de la bonne humeur", type: "chorus" },
                { time: 28, text: "Ce n'est pas votre argent qui f'ra mon bonheur", type: "chorus" },
                { time: 32, text: "Moi j'veux crever la main sur le cœur", type: "chorus" },
                { time: 36, text: "Allons ensemble découvrir ma liberté", type: "chorus" },
                { time: 39, text: "Oubliez donc tous vos clichés", type: "chorus" },
                { time: 42, text: "Bienvenue dans ma réalité", type: "chorus" },
                { time: 46, text: "J'en ai marre de vos bonnes manières, c'est trop pour moi !", type: "line" },
                { time: 49, text: "Moi je mange avec les mains et je suis comme ça !", type: "line" },
                { time: 52, text: "Je parle fort et je suis franche, excusez-moi !", type: "line" },
                { time: 55, text: "Finie l'hypocrisie moi j'me casse de là !", type: "line" },
                { time: 58, text: "J'en ai marre des langues de bois !", type: "line" },
                { time: 61, text: "Regardez-moi, toute manière j'vous en veux pas", type: "line" },
                { time: 64, text: "Et je suis comme ça", type: "line" },
            ],
            vocabulary: {
                "suite": { translation: "Suite", context: "Luxury hotel room." },
                "veux": { translation: "Want", context: "Verb 'Vouloir' (to want)." },
                "bijoux": { translation: "Jewelry", context: "Plural of 'bijou'." },
                "limousine": { translation: "Limousine", context: "Luxury car." },
                "joie": { translation: "Joy", context: "Happiness/Delight." },
                "bonheur": { translation: "Happiness", context: "State of being happy." },
                "liberté": { translation: "Freedom", context: "Liberty." },
                "clichés": { translation: "Stereotypes", context: "Commonplace ideas." },
                "marre": { translation: "Fed up", context: "Expression 'J'en ai marre' (I'm fed up)." },
                "franche": { translation: "Frank/Honest", context: "Direct in speech." },
                "langues": { translation: "Tongues", context: "'Langue de bois' = empty rhetoric/waffle." }
            }
        },
        3: {
            id: 3,
            title: "La Vie En Rose",
            artist: "Édith Piaf",
            videoId: "8nUd4IId9l0",
            level: "B2",
            lyrics: [
                { time: 2, text: "Des yeux qui font baisser les miens", type: "line" },
                { time: 6, text: "Un rire qui se perd sur sa bouche", type: "line" },
                { time: 10, text: "Voilà le portrait sans retouche", type: "line" },
                { time: 14, text: "De l'homme auquel j'appartiens", type: "line" },
                { time: 18, text: "Quand il me prend dans ses bras", type: "chorus" },
                { time: 22, text: "Il me parle tout bas", type: "chorus" },
                { time: 26, text: "Je vois la vie en rose", type: "chorus" },
                { time: 30, text: "Il me dit des mots d'amour", type: "chorus" },
                { time: 34, text: "Des mots de tous les jours", type: "chorus" },
                { time: 38, text: "Et ça me fait quelque chose", type: "chorus" },
                { time: 42, text: "Il est entré dans mon cœur", type: "line" },
                { time: 45, text: "Une part de bonheur", type: "line" },
                { time: 48, text: "Dont je connais la cause", type: "line" },
            ],
            vocabulary: {
                "yeux": { translation: "Eyes", context: "Body part." },
                "baisser": { translation: "To lower", context: "Look down." },
                "rire": { translation: "Laugh", context: "Noun or Verb." },
                "portrait": { translation: "Portrait", context: "Image/Description." },
                "bras": { translation: "Arms", context: "Body part." },
                "bas": { translation: "Low/Quietly", context: "Speaking softly." },
                "vois": { translation: "See", context: "Verb 'Voir' (to see)." },
                "vie": { translation: "Life", context: "Noun." },
                "rose": { translation: "Pink", context: "The color." },
                "amour": { translation: "Love", context: "Noun." },
                "chose": { translation: "Thing", context: "Something." },
                "bonheur": { translation: "Happiness", context: "Joy." }
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
