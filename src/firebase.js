import firebase from "firebase";
const firebaseApp = firebase.initializeApp(
 {
    apiKey: "AIzaSyDdLiEH_hlkfhlG6KHS-Y7fNYMQuKtuEOg",
    authDomain: "insta-clone-react-firebase.firebaseapp.com",
    projectId: "insta-clone-react-firebase",
    storageBucket: "insta-clone-react-firebase.appspot.com",
    messagingSenderId: "560031113786",
    appId: "1:560031113786:web:3648d750937d56789c4b03",
    measurementId: "G-TRDFNQFYFQ"
  });

  const db=firebaseApp.firestore();
  const auth= firebase.auth();
  const storage= firebase.storage();

  export {db,auth,storage};