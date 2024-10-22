import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

// Define the type for the Profile and AuthContext
type ProfileType = {
    id: string;
    username: string;
    email: string;
    group: string;
};

type AuthType = {
    session: Session | null;
    loading: boolean;
    profile: ProfileType | null;
    idAdmin: boolean;
};

// Create the AuthContext with a default value
const AuthContext = createContext<AuthType>({
    session: null,
    loading: true,
    profile: null,
    idAdmin: false
});

// AuthProvider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<ProfileType | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Error fetching session:", error.message);
            } else {
                if (data.session) {
                    // Fetch profile
                    const { data: profileData, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', data.session.user.id)
                        .single();

                    if (profileError) {
                        console.error("Error fetching profile:", profileError.message);
                    } else {
                        setProfile(profileData || null);
                    }
                }
                setSession(data.session); // Update state with fetched session
            }
            setLoading(false); // Set loading to false after fetching
        };

        fetchSession(); // Call the async function

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
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
                profile, 
                idAdmin: profile?.group === 'ADMIN' || false, // Ensure idAdmin defaults to false
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
    return context;
};
