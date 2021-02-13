import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB_tddTuZVQPKRevZcAW90gfmUp783UxpU",
    authDomain: "crwn-db-c9077.firebaseapp.com",
    databaseURL: "https://crwn-db-c9077.firebaseio.com",
    projectId: "crwn-db-c9077",
    storageBucket: "crwn-db-c9077.appspot.com",
    messagingSenderId: "620386242708",
    appId: "1:620386242708:web:e094daa480905490bbe481",
    measurementId: "G-1ZSZ715M8R"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
