import { api } from "@/api";
import { useAuthStore } from "@/stores";

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const signIn = async (email: string, password: string) => {
    const { user } = await api.signIn(email, password);
    console.log(`登录请求`, user);

    if (!user) return;
    console.log(`登录成功`, user);
    setAuth(user);
  };

  const signOut = async () => {
    await api.signOut();
    clearAuth();
  };

  return { signIn, signOut };
};
