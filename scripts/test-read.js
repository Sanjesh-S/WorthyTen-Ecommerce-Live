const firebase = require('firebase/compat/app');
require('firebase/compat/storage');
global.XMLHttpRequest = require('xhr2');

const firebaseConfig = {
    apiKey: "AIzaSyC4SqbxwKCJmUBNKt85UwEJgNnep9t7qOY",
    authDomain: "worthyten-otp-a925d.firebaseapp.com",
    projectId: "worthyten-otp-a925d",
    storageBucket: "worthyten-otp-a925d.appspot.com",
    messagingSenderId: "1067702314639",
    appId: "1:1067702314639:web:0bb2a39181720c306572fa"
};

console.log("Initializing...");
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

async function test() {
    console.log("Attempting to list Nikon Images...");
    try {
        const res = await storage.ref('Nikon Images').listAll();
        console.log("SUCCESS! Found " + res.items.length + " files.");
        console.log("First file: " + res.items[0].name);
    } catch (e) {
        console.log("FAILED to list files: " + e.code);
        console.log(e.message);
    }
}

test();
