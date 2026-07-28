import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkG9FbpgnvoGYE-TrPwl921mIanEh88vQ",
  authDomain: "eversun-ai-crm.firebaseapp.com",
  projectId: "eversun-ai-crm",
  storageBucket: "eversun-ai-crm.firebasestorage.app",
  messagingSenderId: "20931621533",
  appId: "1:20931621533:web:08e5e45ab389727c5e1a74",
  measurementId: "G-RJFZBSM9MY"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;