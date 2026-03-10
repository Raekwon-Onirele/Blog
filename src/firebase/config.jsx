import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlqjBO5Kl_Ic1Q-UINWWhLWjChUkRHE24",
  authDomain: "mini-blog-aceec.firebaseapp.com",
  projectId: "mini-blog-aceec",
  storageBucket: "mini-blog-aceec.firebasestorage.app",
  messagingSenderId: "230878428439",
  appId: "1:230878428439:web:e54b34551ca1154246cb52",
  measurementId: "G-QQ5G9N4S90" 
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const auth = getAuth(app)

export { db, auth }


