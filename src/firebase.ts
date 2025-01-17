import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp,
} from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import {
  Firestore,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDpvvp5VM8VT7G1m-KX80RB9b2cGO4WJgs',
  authDomain: 'upwaiter.firebaseapp.com',
  projectId: 'upwaiter',
  storageBucket: 'upwaiter.firebasestorage.app',
  messagingSenderId: '860107253776',
  appId: '1:860107253776:web:d4136207a49313befb0295',
  measurementId: 'G-3416NWV8JB',
};

const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
