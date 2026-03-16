import { useState, useEffect, useCallback } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  User 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/src/firebase';

export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  loginError: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setLoginError(null);
        // Ensure user profile exists
        const userRef = doc(db, 'users', u.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, { 
            uid: u.uid, 
            email: u.email, 
            displayName: u.displayName, 
            role: 'user', 
            createdAt: new Date().toISOString() 
          });
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = useCallback(async () => {
    setLoginError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        setLoginError('The login popup was closed. Please ensure popups are allowed and try again.');
      } else if (error.code !== 'auth/cancelled-popup-request') {
        setLoginError('An error occurred during login. Please try again.');
      }
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return { user, loading, loginError, login, logout };
}
