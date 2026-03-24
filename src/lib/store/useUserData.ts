import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Match your Django response structure exactly
interface Tenant {
  id: string;
  name: string;
}

interface UserData {
  id: string;
  name: string;
  tenant: Tenant;
  role: string;
  is_active: boolean;
}

interface UserState {
  userData: UserData | null;
  // Actions
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}

export const useUserData = create<UserState>()(
  persist(
    (set) => ({
      userData: null,

      setUserData: (data) => set({ userData: data }),
      
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: 'user-data',
      storage: createJSONStorage(() => localStorage),
    }
  )
);