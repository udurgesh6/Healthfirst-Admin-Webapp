import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyB-zpCYfhqd4I-w-QucnGpy7Zl1AdTrDMM",
    authDomain: "healthfirst-b9757.firebaseapp.com",
    projectId: "healthfirst-b9757",
    storageBucket: "healthfirst-b9757.appspot.com",
    messagingSenderId: "640675158030",
    appId: "1:640675158030:web:a0ddbafed4249a472c045f",
    measurementId: "G-LLMRJ4KZJC"
};

const fire = firebase.initializeApp(firebaseConfig);


export default fire;