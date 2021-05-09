import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA-aF6Yh74OtygBAGQg59LT_LwxbjJFlic",
    authDomain: "linkedin-clone-e0e8f.firebaseapp.com",
    projectId: "linkedin-clone-e0e8f",
    storageBucket: "linkedin-clone-e0e8f.appspot.com",
    messagingSenderId: "257916483003",
    appId: "1:257916483003:web:e6882ef3cd848ea871009e"
  };
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
 
  const auth=firebase.auth();

  const provider=new firebase.auth.GoogleAuthProvider();
  const storage=firebase.storage();


  export {auth,provider,storage};
  export default db;
