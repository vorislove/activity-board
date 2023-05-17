import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_APP_ID
// };

const firebaseConfig = {
	apiKey: 'AIzaSyBLShF8p06UPtNIvmG3kyI1Jjg0k6yRFw0',
	authDomain: 'todolist-943d3.firebaseapp.com',
	projectId: 'todolist-943d3',
	storageBucket: 'todolist-943d3.appspot.com',
	messagingSenderId: '717074833898',
	appId: '1:717074833898:web:8881ff2e0fff95be9b1293'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
