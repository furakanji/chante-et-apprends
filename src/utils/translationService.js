
/**
 * Fetches translation from MyMemory API
 * Free tier: 5000 chars/day
 * @param {string} word - Word to translate
 * @param {string} from - Source language code (default 'fr')
 * @param {string} to - Target language code (default 'en')
 * @returns {Promise<string>} The translated text
 */
export const fetchTranslation = async (word, from = 'fr', to = 'en') => {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${from}|${to}`);
        const data = await response.json();

        if (data.responseStatus === 200) {
            return data.responseData.translatedText;
        } else {
            console.warn("Translation API error:", data.responseDetails);
            return null;
        }
    } catch (error) {
        console.error("Translation fetch failed:", error);
        return null;
    }
};
