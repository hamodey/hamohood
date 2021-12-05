import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCwHQ-69yYuxer6QtIbpO6ZyvFHAx4gYUA",
  authDomain: "robinhood-test-545b7.firebaseapp.com",
  databaseURL: "https://robinhood-test-545b7.firebaseio.com",
  projectId: "robinhood-test-545b7",
  storageBucket: "robinhood-test-545b7.appspot.com",
  messagingSenderId: "161680850671",
  appId: "1:161680850671:web:25f77590b46067986f251a",
  measurementId: "G-67KXSDV7Q2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };