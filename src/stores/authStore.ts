import { SessionClass, User } from "@/api/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (state: boolean) => void;
  user: User | null;
  setUser: (state: User | null) => void;
  hasHydrated: boolean;
  setHydrated: (state: boolean) => void;
  session: SessionClass | null;
  setSession: (state: SessionClass | null) => void;
  setAuth: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      session: null,
      hasHydrated: false, // 标记本地存储的数据是否已经加载完毕
      setAuthenticated: (state: boolean) => set({ isAuthenticated: state }),
      setUser: (state: User | null) => set({ user: state }),
      setHydrated: (state: boolean) => set({ hasHydrated: state }),
      setSession: (state: SessionClass | null) => set({ session: state }),
      setAuth: (user: User | null) => set({ isAuthenticated: true, user }),
      clearAuth: () =>
        set({ isAuthenticated: false, session: null, user: null }),
    }),
    {
      name: "auth-storage", // 存在本地的 key 名称
      storage: createJSONStorage(() => AsyncStorage), // 使用 AsyncStorage 存储
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.log("恢复失败", error);
          } else {
            // 这里才是合并完成后的 state
            console.log("恢复完成，用户是:", state?.user);
            state?.setHydrated(true);
          }
        };
      },
    },
  ),
);
