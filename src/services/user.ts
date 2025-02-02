import { FirestoreSettings, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { VariantProps } from 'class-variance-authority';

const usersCollection = collection(db, '/users');

const setting: FirestoreSettings = {};
setting.ignoreUndefinedProperties = true;

export const userService = {
  getById: async (userId: string) => {
    try {
      const data = await getDoc(doc(usersCollection, userId));
      if (data.exists()) {
        const result = { ...data.data(), id: data.id };
        console.log('dati', result);

        return result;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
