// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//firebase storage
/* allow read;
allow write:if 
request.resource.size < 2* 1024 * 1024 &&
request.resource.contentType.matches('image/.*') */
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mynew-website-78a42.firebaseapp.com",
  projectId: "mynew-website-78a42",
  storageBucket: "mynew-website-78a42.appspot.com",
  messagingSenderId: "889217189393",
  appId: "1:889217189393:web:bc20a3a3d09479280593b0"
};

// Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  

