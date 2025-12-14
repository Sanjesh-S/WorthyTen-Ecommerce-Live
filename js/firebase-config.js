const firebaseConfig = {
  apiKey: "AIzaSyC4SqbxwKCJmUBNKt85UwEJgNnep9t7qOY",
  authDomain: "worthyten-otp-a925d.firebaseapp.com",
  projectId: "worthyten-otp-a925d",
  storageBucket: "worthyten-otp-a925d.appspot.com",
  messagingSenderId: "1067702314639",
  appId: "1:1067702314639:web:0bb2a39181720c306572fa",
  measurementId: "G-WBXQ5SM16Y"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  if (window.Logger) {
    window.Logger.log("✅ Firebase initialized successfully!");
  }
  
  // Initialize Firebase Analytics if available
  if (firebase.analytics) {
    try {
      const analytics = firebase.analytics();
      if (window.Logger) {
        window.Logger.log("✅ Firebase Analytics initialized!");
      }
      window.firebaseAnalytics = analytics;
    } catch (e) {
      if (window.Logger) {
        window.Logger.warn("Firebase Analytics not available:", e);
      }
    }
  }
}
