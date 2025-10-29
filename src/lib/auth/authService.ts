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
  goto("/dashboard");

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

export async function logout() {
  await supabase.auth.signOut();
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
  return supabase.auth.onAuthStateChange((event, session) =>
    callback(event, session)
  );
}
