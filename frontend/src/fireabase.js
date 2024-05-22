import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD_PW9g_uwzncbrsQUEdzxPp5R28LTBPxc",
  authDomain: "youthoob-c3105.firebaseapp.com",
  projectId: "youthoob-c3105",
  storageBucket: "youthoob-c3105.appspot.com",
  messagingSenderId: "314639030566",
  appId: "1:314639030566:web:f1b3cb68e8bd35054949e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider=new GoogleAuthProvider();

export default app;