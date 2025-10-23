import { writable } from 'svelte/store';
import { getCurrentUserDisplayName } from '../userProfile.js';

export interface UserState {
  display_name: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initialer Store-Zustand
const initialState: UserState = {
  display_name: '',
  isLoggedIn: false,
  isLoading: true,
  error: null
};

// Writable Store erstellen
export const userStore = writable<UserState>(initialState);

// Funktion zum Laden der Benutzerdaten
export async function loadUserData() {
  userStore.update(state => ({ ...state, isLoading: true, error: null }));
  
  try {
    const display_name = await getCurrentUserDisplayName();
    const isLoggedIn = display_name !== 'Unbekannter Benutzer';
    
    userStore.update(state => ({
      ...state,
      display_name,
      isLoggedIn,
      isLoading: false,
      error: null
    }));
  } catch (error) {
    console.error('Fehler beim Laden der Benutzerdaten:', error);
    userStore.update(state => ({
      ...state,
      display_name: 'Unbekannter Benutzer',
      isLoggedIn: false,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler'
    }));
  }
}

// Funktion zum Zurücksetzen des Stores (z.B. beim Logout), dann wird das rausgeschmissen
export function resetUserData() {
  userStore.set(initialState);
}

// Funktion zum Aktualisieren des Display Names
export function updateDisplayName(newDisplayName: string) {
  userStore.update(state => ({
    ...state,
    display_name: newDisplayName,
    isLoggedIn: true
  }));
}
