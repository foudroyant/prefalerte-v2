// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { DocumentData, collection, getDocs, getFirestore, query } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA8lgGtRSa88KEc1X_0BhHm0Xfeh4eOfg",
  authDomain: "djowyett.firebaseapp.com",
  databaseURL: "https://djowyett-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "djowyett",
  storageBucket: "djowyett.appspot.com",
  messagingSenderId: "478289729883",
  appId: "1:478289729883:web:713cc9802f6b2e45b2627e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function prefectures() {
    const prefRef = collection(db, "prefectures");
    const q = query(prefRef);
    const _prefectures: any [] = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        _prefectures.push(doc.data())
    });

    return _prefectures;
}