interface RoomMetadata {
  platform: "斗鱼" | "虎牙" | "Unknown";
  roomId: string | null;
}

/**
 * 解析直播URL，提取平台和房间ID
 * @param url 直播链接
 * @returns 包含平台和房间ID的对象
 */
export function parseLiveUrl(url: string): RoomMetadata {
  const configs = [
    { name: "斗鱼", reg: /douyu\.com\/([0-9]+)/ },
    { name: "虎牙", reg: /huya\.com\/([0-9]+)/ },
  ] as const;

  for (const config of configs) {
    const match = url.match(config.reg);
    if (match && match[1]) {
      return {
        platform: config.name as "斗鱼" | "虎牙",
        roomId: match[1],
      };
    }
  }

  return { platform: "Unknown", roomId: null };
}

/**
 * 验证URL是否有效
 * @param url 要验证的URL
 * @returns 是否有效
 */
export function isValidUrl(url: string): boolean {
  try {
    // 先简单检查是否为空或无效字符
    if (!url || typeof url !== "string") {
      return false;
    }

    // 检查协议是否为 http 或 https
    if (!url.startsWith("http") && !url.startsWith("https")) {
      return false;
    }

    // URL 构造函数如果解析失败会抛出异常
    const newUrl = new URL(url);
    // 确保协议是 http 或 https (可选，根据业务需求定制)
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    console.error("URL解析失败:", err);
    return false;
  }
}
