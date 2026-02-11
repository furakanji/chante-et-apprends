import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBj0XpeKkFX5flEjifD5KogIGzg1_YJOQM",
    authDomain: "motmotmot.firebaseapp.com",
    projectId: "motmotmot",
    storageBucket: "motmotmot.firebasestorage.app",
    messagingSenderId: "398599756270",
    appId: "1:398599756270:web:620246d0e94b52384cd6ff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
