import { createContext, useState, useContext, useEffect} from 'react';
import supabase from '../../supabase-client';

const AuthContext = createContext();

export const AuthContextProvider =  ({ children }) => {
    const [session, setSession] = useState(undefined);

useEffect(() => {
    async function getInitialSession() {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error(error);
            return;
        }

        setSession(data.session);
    }

    getInitialSession();

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
    });

    return () => subscription.unsubscribe();
}, []);


    // auth functions
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


export const useAuth = () => {
  return useContext(AuthContext);
};