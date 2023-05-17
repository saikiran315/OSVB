import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import * as firebase from "firebase/app";
import { useEffect } from "react";
const firebaseConf = {
  apiKey: "AIzaSyBAX2u96gpYSmM7CuECu6c5scZAB2zl5ks",
  authDomain: "osvb-1.firebaseapp.com",
  projectId: "osvb-1",
  storageBucket: "osvb-1.appspot.com",
  messagingSenderId: "115801201583",
  appId: "1:115801201583:web:87483ef97d8ade89676d5a",
  measurementId: "G-CJF52B9K88"
};

const app = initializeApp(firebaseConf);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore();
const provider = new GoogleAuthProvider()

var currToken = null;

function requestPermission() {
  Notification.requestPermission().then(async (permission)=>{
    const messaging = getMessaging(app);

    if (permission === "granted") {
      // Generate Token

      await getToken(messaging, {
        vapidKey:
          "BIn0ve8Z-VyYOM089LsQ0LwIJHRZpSgeGL9OFQwKlGdmRU6XMdS3iCIxLFv1J9Aabu8c9AOFixeS3Vc68tJ2xYc",
      }).then((currentToken) => {
        if (currentToken) {
          currToken = currentToken;
          console.log("current token:",currentToken);
          
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  });
}

// useEffect(

//   ,[])
  
  setTimeout(function() { requestPermission(); }, 5000);

export {auth, storage, db, provider,currToken}