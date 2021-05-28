import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



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
