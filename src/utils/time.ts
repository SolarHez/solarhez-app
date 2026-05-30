/**
 * 格式化时间戳为中文时间字符串
 * @param timestamp 时间戳
 * @returns 中文时间字符串
 */
export function formatTimestamp(timestamp: string | number | undefined) {
  if (!timestamp) return "";
  const date = new Date(Number(timestamp) * 1000); // 假设是秒级时间戳
  return date.toLocaleString("zh-CN");
}

/**
 * 计算直播时长
 * @param startTime 直播开始时间戳
 * @returns 直播时长字符串
 */
export function calculateLiveDuration(startTime: string | number | undefined) {
  if (!startTime) return "--";

  const start = new Date(Number(startTime) * 1000);
  const now = new Date();

  // 计算时间差（毫秒）
  const diffMs = now.getTime() - start.getTime();

  // 转换为小时和分钟
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}小时${minutes}分钟`;
  } else {
    return `${minutes}分钟`;
  }
}
