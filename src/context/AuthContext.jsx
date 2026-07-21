import { createContext, useState, useContext, useEffect} from 'react';
import supabase from '../../supabase-client';

const AuthContext = createContext();

/**
 * AuthContextProvider Component
 *
 * Provides authentication state and authentication methods to all
 * descendant components using React Context. 
 * 
 * 
 * The provider initializes the current Supabase session, listens for authentication state changes,
 * and exposes helper functions for signing in/out.
 *
 * @component
 * @param {React.ReactNode} props.children - Child components that will have access to the authentication context.
 * @returns {JSX.Element} An AuthContext provider wrapping the application's children.
 *
 * @example
 * // Wrap your application
 * import { AuthContextProvider } from './context/AuthContext';
 *
 * function App() {
 *   return (
 *     <AuthContextProvider>
 *       <HomePage />
 *     </AuthContextProvider>
 *   );
 * }
 */                                                                                                                                                           

export const AuthContextProvider =  ({ children }) => {
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        async function getInitialSession() {
            const { data: {session}, error } = await supabase.auth.getSession();

            if (error) {
                console.error(error);
                return;
            }

        setSession(session);
    }

        getInitialSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        return () => subscription.unsubscribe();
    }, []);


   
    const signInUser = async (email) => {
        try {
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
                 options: {
                    emailRedirectTo: "http://localhost:5173/dashboard",
                    shouldCreateUser: false,
                }
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: "An unexpected error occurred.",
            };
        }
    };

    const signOutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Supabase sign-out error:', error.message);
                return { success: false, error: error.message };
            }
            return { success: true };
        } catch (error) {
            console.error('Unexpected error during sign-out:', error.message);
            return { success: false, error: 'An unexpected error occurred during sign out.' };
    }
  }

     return (
    <AuthContext.Provider
    value={{
        session,
        signInUser, 
        signOutUser,
    }}
>
      {children}
    </AuthContext.Provider>
  );
};


/**
 * useAuth Hook
 *
 * Provides access to the authentication context, including the current
 * session and authentication helper functions.
 *
 * @function
 * @returns {Object} Authentication context.
 * @returns {import('@supabase/supabase-js').Session | null | undefined} returns.session The current authenticated session (session || null || undefined)
 * @returns {Function} returns.signInUser Sends a magic sign-in link to the user's email.
 * @returns {Function} returns.signOut Signs the current user out.
 *
 * @example
 * // Sign the user out
 * function LogoutButton() {
 *   const { signOut } = useAuth();
 *
 *   return (
 *     <button onClick={signOut}>
 *       Sign Out
 *     </button>
 *   );
 * }
 */

export const useAuth = () => {
  return useContext(AuthContext);
};
