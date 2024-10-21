import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

// Define the type for the AuthContext
type AuthType = {
    session: Session | null;
    loading: boolean; // Include loading state
};

// Create the AuthContext with a default value
const AuthContext = createContext<AuthType>({
    session: null,
    loading: true,
});

// AuthProvider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            console.log(data);
            if (error) {
                console.error('Error fetching session:', error.message);
            } else {
                setSession(data.session); // Update state with fetched session
            }
            setLoading(false); // Set loading to false after fetching
        };

        fetchSession(); // Call the async function

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Cleanup subscription on unmount
        return () => {
            subscription?.unsubscribe();
        };
    }, []); 

    return (
        <AuthContext.Provider
            value={{
                loading,
                session,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context; // Ensure the context is not undefined
};
