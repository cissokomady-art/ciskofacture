import { supabase } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  companyName?: string;
  city?: string;
  country?: string;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(
  email: string,
  password: string,
  metadata?: { fullName?: string; companyName?: string; city?: string; country?: string }
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: metadata?.fullName || "",
        company_name: metadata?.companyName || "Mon Entreprise",
        city: metadata?.city || "Dakar",
        country: metadata?.country || "Sénégal",
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/tableau-de-bord`,
    },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/parametres`,
  });
  if (error) throw error;
  return data;
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("getCurrentSession error:", error);
    return null;
  }
  return data.session;
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return {
    id: data.user.id,
    email: data.user.email || "",
    fullName: data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Entrepreneur",
    companyName: data.user.user_metadata?.company_name || "Cisko Digital Ventures SARL",
    city: data.user.user_metadata?.city || "Dakar",
    country: data.user.user_metadata?.country || "Sénégal",
  };
}
