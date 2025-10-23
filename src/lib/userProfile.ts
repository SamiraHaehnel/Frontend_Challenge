import { supabase } from './supabaseClient';
import type { User } from '@supabase/supabase-js';

// Vereinfachte UserProfile-Interface für display_name aus Auth
export interface UserProfile {
    id: string;
    display_name: string;
    email: string;
}
// Lädt das aktuelle User-Profil aus der Auth-Session
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        return null;
    }
    
    return {
        id: user.id,
        display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'User',
        email: user.email || ''
    };
}

// Lädt User-Profil für einen spezifischen User (nur für Admin-Zwecke)
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
        const { data } = await supabase.auth.admin.getUserById(userId);
        const user = data.user;
        
        if (!user) {
            return null;
        }
        
        return {
            id: user.id,
            display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'User',
            email: user.email || ''
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}

// Aktualisiert den display_name des aktuellen Benutzers in der Auth-Tabelle (irgendwann für später)
export async function updateUserDisplayName(newDisplayName: string): Promise<{ success: boolean; error?: string }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        return { success: false, error: 'Benutzer nicht angemeldet.' };
    }
    
    // Update user metadata with new display_name
    const { error } = await supabase.auth.updateUser({
        data: { display_name: newDisplayName }
    });
    
    if (error) {
        console.error('Error updating display name:', error);
        return { success: false, error: 'Fehler beim Aktualisieren des Anzeigenamens.' };
    }
    
    return { success: true };
}

// Holt den Anzeigenamen des aktuellen Users
export async function getCurrentUserDisplayName(): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        return 'Unbekannter Benutzer';
    } 
    
    return user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';
}

// Holt den Anzeigenamen für einen spezifischen User
export async function getUserDisplayName(userId?: string): Promise<string> {
    if (userId) {
        const profile = await getUserProfile(userId);
        return profile?.display_name || 'Unbekannter Benutzer';
    } else {
        return await getCurrentUserDisplayName();
    }
}
