import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {

    apiKey: "AIzaSyAhdm4k9mMcDWZZerDkemzTRIn6Y1_Q4sY",
  
    authDomain: "substations-d1deb.firebaseapp.com",
  
    projectId: "substations-d1deb",
  
    storageBucket: "substations-d1deb.appspot.com",
  
    messagingSenderId: "881540471333",
  
    appId: "1:881540471333:web:b844982943b25e3af83dcc"
  
};
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);

  export const db = getDatabase(app);


