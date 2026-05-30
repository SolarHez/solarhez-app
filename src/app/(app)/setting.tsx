import { useAuth } from "@/hooks/useAuth";
import {
  View,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/stores";
import { styled } from "nativewind";
import appJson from "../../../app.json";
import { useDataStore } from "@/stores/dataStore";
import { useEffect } from "react";

const StyledIonicons = styled(Ionicons);

// 自定义设置项组件
const SettingItem = ({
  title,
  icon,
  onPress,
  isDestructive = false,
  children = null,
}: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4 active:bg-accent"
  >
    <View className="flex-row items-center gap-3">
      <StyledIonicons
        name={icon}
        size={22}
        className={isDestructive ? "text-destructive" : "text-muted-foreground"}
      />
      <View className="flex-row justify-between flex-1">
        <Text
          className={isDestructive ? "text-destructive" : "text-foreground"}
        >
          {title}
        </Text>
        <Text className="text-foreground/50">{children}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const user = useAuthStore((state) => state.user);
  const email = useDataStore((state) => state.email);
  const getEmail = useDataStore((state) => state.getEmail);
  const version = appJson.expo.version;

  useEffect(() => {
    getEmail(user?.id || "");
  }, [user?.id]);

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="p-4" automaticallyAdjustContentInsets={false}>
          <View className="flex-row items-center gap-4 p-4 rounded-full bg-card shadow-xs border border-background/20 my-10">
            <Image
              source={{
                uri: user?.image || `https://github.com/shadcn.png`,
              }}
              borderRadius={100}
              className="border-2 border-foreground/20 w-20 h-20 rounded-full"
            />
            <View>
              <Text className="text-2xl font-bold text-foreground">
                {user?.name || "未登录"}
              </Text>
              <View className="flex-row justify-center items-center gap-1">
                <StyledIonicons
                  name="mail-outline"
                  size={15}
                  className="text-muted-foreground"
                />
                <Text className="text-muted-foreground">
                  {user?.email || "未绑定邮箱"}
                </Text>
              </View>
            </View>
          </View>

          {/* 通用模块 */}
          <Text className="mb-2 text-foreground">APP设置</Text>
          <View className="mb-6 bg-card rounded-xl shadow-xs overflow-clip">
            <SettingItem
              title="通知提醒"
              icon="notifications-outline"
              children={email || "未绑定邮箱"}
            />
            <SettingItem
              title="主题切换"
              icon="color-palette-outline"
              children="跟随系统"
            />
          </View>

          <Text className="mb-2 text-foreground">其他</Text>
          <View className="mb-6 bg-card rounded-xl shadow-xs overflow-clip">
            <SettingItem title="检查更新" icon="arrow-up-circle-outline" />
            <SettingItem
              title="版本号"
              icon="information-circle-outline"
              children={version}
            />
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
