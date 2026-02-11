
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { franc } from 'franc-min';

export const validateYoutubeUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

export const fetchYoutubeMetadata = async (videoId) => {
    try {
        const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return {
            title: data.title,
            author_name: data.author_name,
            thumbnail_url: data.thumbnail_url
        };
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return null;
    }
};

export const fetchLyrics = async (artist, title) => {
    try {
        // Clean up artist/title for better search results
        // Remove things like (Official Video), ft., etc. if needed
        // For now, let's try raw first, then maybe clean if failed
        const cleanArtist = artist.replace(/ - Topic|VEVO|Official|Video|Clip|Lyic/gi, "").trim();
        const cleanTitle = title.replace(/\(.*\)|\[.*\]|ft\..*|feat\..*/gi, "").trim();

        const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(cleanArtist)}/${encodeURIComponent(cleanTitle)}`);
        if (!response.ok) throw new Error("Lyrics not found");

        const data = await response.json();
        return data.lyrics;
    } catch (error) {
        console.warn("Lyrics fetch failed:", error);
        return null;
    }
};

export const isFrench = (text) => {
    // Basic check: franc returns 'fra' for French
    const lang = franc(text);
    return lang === 'fra';
};

export const saveSong = async (songData) => {
    try {
        const docRef = await addDoc(collection(db, 'community_songs'), {
            ...songData,
            createdAt: serverTimestamp(),
            status: 'approved' // Auto-approve for now
        });
        return docRef.id;
    } catch (error) {
        console.error("Error saving song:", error);
        throw error;
    }
};
