var firebaseConfig = {
    apiKey: "AIzaSyA3pn7TTuOUoGPk3pliVUgbH5-xIysHHj8",
    authDomain: "cyusa-project-9570e.firebaseapp.com",
    databaseURL: "https://cyusa-project-9570e.firebaseio.com",
    projectId: "cyusa-project-9570e",
    storageBucket: "cyusa-project-9570e.appspot.com",
    messagingSenderId: "1085067100368",
    appId: "1:1085067100368:web:9496966a0e62e503f91ed5",
    measurementId: "G-3X352JZ9HR"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  