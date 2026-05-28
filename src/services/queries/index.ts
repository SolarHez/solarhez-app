import { queryOptions } from "@tanstack/react-query";

export const liveQuerys = {
  all: () => ["player-live"] as const,
  info: (rid: number, platform: string) =>
    queryOptions({
      queryKey: [...liveQuerys.all(), "info", rid, platform],
      queryFn: () => Promise.resolve({}),
      staleTime: 1000 * 60 * 1, // 视频列表缓存1分钟
      enabled: !!rid,
    }),
  url: (rid: number, platform: string) =>
    queryOptions({
      queryKey: [...liveQuerys.all(), "url", rid, platform],
      queryFn: () => Promise.resolve({}),
      enabled: !!rid,
    }),
};
