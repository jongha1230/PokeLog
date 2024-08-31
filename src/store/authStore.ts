import api from "@/api";
import supabase from "@/api/supabaseAPI";
import { UserProfile } from "@/types/supabaseTypes";
import { create } from "zustand";

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  signOut: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  checkAuth: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const profile = await api.user.getProfile(user.id);

        set({ user: profile, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error("Auth check failed", error);
      set({ user: null, isLoading: false });
    }
  },
}));
