import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '@/store/user';
import { auth } from '@/firebase';

export const useAuthListener = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();

        useUserStore.setState({
          isAuthenticated: true,
        });
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);
};
