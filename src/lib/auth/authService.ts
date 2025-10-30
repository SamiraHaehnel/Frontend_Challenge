import { supabase } from "$lib/supabaseClient";
import { goto } from "$app/navigation";
export interface AuthResult {
  data: any;
  error: any;
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { data, error };
  if (data?.session) {
    localStorage.setItem("sb-access-token", data.session.access_token);
    localStorage.setItem("sb-refresh-token", data.session.refresh_token);
    goto("/dashboard");
  }

  return { data, error };
}

export async function signup(
  email: string,
  password: string,
  nickname: string
): Promise<AuthResult> {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/auth`
          : undefined,
      data: {
        display_name: nickname,
      },
    },
  });
}

// export async function logout() {
//   await supabase.auth.signOut();
//   goto("/");
// }
export async function logout() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Supabase logout error:", error);
  }

  localStorage.removeItem("sb-access-token");
  localStorage.removeItem("sb-refresh-token");

  document.cookie =
    "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  goto("/");
}
export async function resetPassword(email: string): Promise<AuthResult> {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : undefined,
  });
}

export async function updatePassword(newPassword: string): Promise<AuthResult> {
  return await supabase.auth.updateUser({ password: newPassword });
}

export async function signInWithOAuth(
  provider: "github" | "google"
): Promise<AuthResult> {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/auth`
          : undefined,
    },
  });
}

export function onAuthChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session) {
      // Store session access token and refresh token in localStorage
      localStorage.setItem("sb-access-token", session.access_token);
      localStorage.setItem("sb-refresh-token", session.refresh_token);
    }
    callback(event, session);
  });
}
