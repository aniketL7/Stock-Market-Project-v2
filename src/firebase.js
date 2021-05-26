import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


firebase.initializeApp({
    apiKey: "AIzaSyAGB4E3JHe_4cK7dZSxeF0CO5hunTdAInc",
    authDomain: "test-project-897ae.firebaseapp.com",
    databaseURL: "https://test-project-897ae-default-rtdb.firebaseio.com",
    projectId: "test-project-897ae",
    storageBucket: "test-project-897ae.appspot.com",
    messagingSenderId: "12292061419",
    appId: "1:12292061419:web:3f6ddafb4c89fa9ae5e6ae",
    measurementId: "G-STWXB7DG7T"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    console.log("generating user docs");
    const userRef = firestore.doc(`users/${user.uid}`);
    console.log("printing userRef");
    const snapshot = await userRef.get();
    console.log("snapshot is ");
    console.log(snapshot);
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
};
  
const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
  
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
};