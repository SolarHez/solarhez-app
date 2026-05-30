import { api } from "@/api";
import { queryOptions } from "@tanstack/react-query";

export const authQuerys = {
  all: () => ["auth"] as const,
  signIn: (email: string, password: string) =>
    queryOptions({
      queryKey: [...authQuerys.all(), "signIn", email, password],
      queryFn: () => api.signIn(email, password),
      enabled: !!email && !!password,
    }),
  signOut: () =>
    queryOptions({
      queryKey: [...authQuerys.all(), "signOut"],
      queryFn: () => api.signOut(),
    }),
  getSession: () =>
    queryOptions({
      queryKey: [...authQuerys.all(), "getSession"],
      queryFn: () => api.getSession(),
    }),
};
