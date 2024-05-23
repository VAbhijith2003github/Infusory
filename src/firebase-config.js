import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKVBkNMbJy7bddvw52_VY2irzoZw0eIkU",
  authDomain: "drender-1c3b6.firebaseapp.com",
  projectId: "drender-1c3b6",
  storageBucket: "drender-1c3b6.appspot.com",
  messagingSenderId: "541483979130",
  appId: "1:541483979130:web:9cf1b1406011531d8f06c3",
  measurementId: "G-B0T49SDNG6",
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);