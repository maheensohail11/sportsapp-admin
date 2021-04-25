import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCejoyLZ7AP-_D39Rqw8qoXJ9W94SSIw54",
    authDomain: "sportify-7163b.firebaseapp.com",
    databaseURL: 'https://sportify-7163b.firebaseio.com',
    projectId: "sportify-7163b",
    storageBucket: "sportify-7163b.appspot.com",
    messagingSenderId: "281722615560",
    appId: "1:281722615560:web:044e8a2b8e52db31869ebd",
    measurementId: "G-W2VRW6P323"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    var firebaseDb= firebase.initializeApp(firebaseConfig);
    
}
export const storageRef = firebase.storage();
   export default firebaseDb;