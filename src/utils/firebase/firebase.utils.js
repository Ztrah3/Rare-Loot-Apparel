import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyDDU4V-_QV3M8GyhC9SVieRTDM4dbiT0Yk',
  authDomain: 'crwn-clothing-db-98d4d.firebaseapp.com',
  projectId: 'crwn-clothing-db-98d4d',
  storageBucket: 'crwn-clothing-db-98d4d.appspot.com',
  messagingSenderId: '626766232035',
  appId: '1:626766232035:web:506621582dab103a4d08d6',
};

// Firebase configuration object
const firebaseApp = initializeApp(firebaseConfig);

// Creating a GoogleAuthProvider instance
const googleProvider = new GoogleAuthProvider();

// Setting custom parameters for the GoogleAuthProvider instance
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Exporting the auth object
export const auth = getAuth();

// Exporting functions for signing in with Google
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Exporting the Firestore database object
export const db = getFirestore();

// Exporting a function for adding a collection and documents to Firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  // Create a reference to the collection in Firestore
  const collectionRef = collection(db, collectionKey);
  // Create a batch to perform multiple write operations
  const batch = writeBatch(db);

  // For each object to add, create a document reference and add it to the batch
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  // Commit the batch
  await batch.commit();
  console.log('done');
};

// Exporting a function for getting categories and documents from Firestore
export const getCategoriesAndDocuments = async () => {
  // Create a reference to the 'categories' collection in Firestore
  const collectionRef = collection(db, 'categories');
  // Create a query for the collection
  const q = query(collectionRef);

  // Execute the query and get the documents
  const querySnapshot = await getDocs(q);
  // Return the data of each document
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

// Exporting a function for creating a user document from an auth user
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // If there's no auth user, return
  if (!userAuth) return;

  // Create a reference to the user's document in Firestore
  const userDocRef = doc(db, 'users', userAuth.uid);
  // Get the user's document
  const userSnapshot = await getDoc(userDocRef);

  // If the user's document doesn't exist, create it
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Set the user's document with the auth user's information and any additional information
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      // Log any errors that occur when creating the user
      console.log('error creating the user', error.message);
    }
  }
  // Return the reference to the user's document
  return userDocRef;
};

// Exporting a function for creating an auth user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Exporting a function for signing in an auth user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Exporting a function for signing out the user
export const signOutUser = async () => await signOut(auth);

// Exporting a function for listening to auth state changes
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
