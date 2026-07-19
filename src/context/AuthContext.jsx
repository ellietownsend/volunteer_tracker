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
 * and exposes helper functions for signing in, verifying an OTP, and signing out.
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

    const verifyOTP = async (email, token) => {
        try {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token,
                type: "email",
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

    const signOut = async () => {
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
        verifyOTP,
        signOut,
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
 * @returns {Function} returns.signInUser Sends a one-time password (OTP) login email.
 * @returns {Function} returns.verifyOTP Verifies the OTP sent to the user's email.
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
