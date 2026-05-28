import { api } from "@/api";
import { Session } from "@/api/type";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { push } = useRouter();

  // 登录
  const signIn = async (email: string, password: string) => {
    const session = await api.signIn(email, password);
    setSession(session as Session);
    if (session) {
      push("/home");
    }
  };

  // 注销
  const signOut = async () => {
    await api.signOut();
    setSession(null);
    push("/auth/sign-in");
  };

  // 获取会话
  const getSession = async () => {
    const sess = await api.getSession();
    setSession(session as Session);
    return sess;
  };

  // 检查是否已登录
  const isAuthenticated = async () => {
    const sess = await getSession();
    if (sess) {
      return push("/home");
    }

    return push("/auth/sign-in");
  };

  return {
    session,
    setSession,
    signIn,
    signOut,
    getSession,
    isAuthenticated,
  };
};
