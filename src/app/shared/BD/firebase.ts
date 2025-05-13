import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const credenGalle = {
  apiKey: "AIzaSyCRZAHINIc8I2xhf6cgoxr0bfjTCJLvKqU",
  authDomain: "bdgallery-12ba6.firebaseapp.com",
  projectId: "bdgallery-12ba6",
  storageBucket: "bdgallery-12ba6.firebasestorage.app",
  messagingSenderId: "810030150052",
  appId: "1:810030150052:web:5a2c307426b79abc8f9131"
};

const app = initializeApp(credenGalle);
const fireDbGallery = getFirestore(app);

export { fireDbGallery };
