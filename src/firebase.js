import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtqtxRjRJ14ZTDTZZmx-2uLIJfzXNjVAs",
  authDomain: "moviebite-8ab46.firebaseapp.com",
  projectId: "moviebite-8ab46",
  storageBucket: "moviebite-8ab46.appspot.com",
  messagingSenderId: "222225614229",
  appId: "1:222225614229:web:a7146c701823c0c6e7629c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
