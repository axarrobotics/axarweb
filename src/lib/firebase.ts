import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCvh23_yQv0QcpjCSll0k8XEbBt6uf9GXc",
  authDomain: "axarrobotics-373f5.firebaseapp.com",
  projectId: "axarrobotics-373f5",
  storageBucket: "axarrobotics-373f5.firebasestorage.app",
  messagingSenderId: "755452885078",
  appId: "1:755452885078:web:ef3db301b34674e65163f7",
  measurementId: "G-9ZJ4ML268Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
