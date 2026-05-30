import { useAuth } from "@/hooks/useAuth";
import {
  View,
  ScrollView,
  Pressable,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/stores";

// 自定义设置项组件
const SettingItem = ({ title, icon, onPress, isDestructive = false }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4 active:bg-accent"
  >
    <View className="flex-row items-center gap-3">
      <Ionicons
        name={icon}
        size={22}
        color={isDestructive ? "#ef4444" : "#6b7280"}
      />
      <Text className={isDestructive ? "text-red-500" : "text-foreground"}>
        {title}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const user = useAuthStore((state) => state.user);

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="p-4">
          <Text className="mb-6 text-4xl font-bold text-foreground">设置</Text>

          {/* 账户模块 */}
          <Text className="mb-2 text-foreground">个人账户</Text>
          <View className="mb-6 bg-card rounded-xl shadow-xs overflow-clip">
            <SettingItem
              title={user?.name || "未登录"}
              icon="person-circle-outline"
            />
            <SettingItem title="修改密码" icon="lock-closed-outline" />
          </View>

          {/* 通用模块 */}
          <Text className="mb-2 text-foreground">偏好设置</Text>
          <View className="mb-6 bg-card rounded-xl shadow-xs overflow-clip">
            <SettingItem title="通知提醒" icon="notifications-outline" />
            <SettingItem title="关于我们" icon="information-circle-outline" />
          </View>

          <View className="mb-6 bg-card rounded-xl shadow-xs overflow-clip">
            {/* 操作模块 */}
            <SettingItem
              title="退出登录"
              icon="log-out-outline"
              isDestructive
              onPress={() =>
                Alert.alert("确认退出", "你确定要退出当前账号吗？", [
                  { text: "取消" },
                  { text: "退出", onPress: () => signOut() },
                ])
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
