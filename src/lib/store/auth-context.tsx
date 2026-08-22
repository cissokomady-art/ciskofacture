"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  UserProfile,
  signIn,
  signUp,
  signInWithGoogle,
  signOut,
  resetPassword,
  getCurrentUser,
} from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: typeof signIn;
  register: typeof signUp;
  loginWithGoogle: typeof signInWithGoogle;
  forgotPassword: typeof resetPassword;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: signIn,
  register: signUp,
  loginWithGoogle: signInWithGoogle,
  forgotPassword: resetPassword,
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadUser = async () => {
    try {
      const current = await getCurrentUser();
      setUser(current);
    } catch (e) {
      console.error("loadUser error:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Entrepreneur",
          companyName: session.user.user_metadata?.company_name || "Cisko Digital Ventures SARL",
          city: session.user.user_metadata?.city || "Dakar",
          country: session.user.user_metadata?.country || "Sénégal",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.push("/connexion");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: signIn,
        register: signUp,
        loginWithGoogle: signInWithGoogle,
        forgotPassword: resetPassword,
        logout: handleLogout,
        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
