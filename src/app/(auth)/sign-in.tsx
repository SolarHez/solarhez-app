import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons"; // 使用 Expo 图标库
import { Image } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("solarhez@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("提示", "请输入邮箱和密码");
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("登录失败", "请检查您的凭据");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      {/* 确保 ScrollView 填满键盘避让区域 */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-4">
          <View className="p-2 bg-background  rounded-4xl shadow-xs border border-input">
            {/* 内容区域 */}
            <View className="p-4 items-center pt-10">
              <Animated.View
                className="items-center justify-center bg-blue-500 p-5 rounded-4xl w-24 h-24 shadow-xl shadow-blue-500 border border-input"
                entering={FadeInUp.duration(1500)}
              >
                <Image
                  source={require("@/assets/images/expo-logo.png")}
                  style={{ width: 33, height: 33 }}
                />
              </Animated.View>
            </View>

            {/* 剩下的表单内容放在这里... */}
            <View className="p-4">
              <View className="p-4 gap-4">
                <View>
                  <Text className="font-medium mb-1.5 ml-1 text-foreground">
                    邮箱
                  </Text>
                  <View className="flex-row items-center  px-4 focus:border-3 rounded-2xl border  border-input bg-input/10 transition-all duration-300">
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      className="mr-3 text-foreground"
                    />
                    <TextInput
                      className="flex-1 py-4 text-foreground placeholder:text-foreground"
                      placeholder="请输入邮箱"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>
                {/* 密码输入框 */}
                <View>
                  <Text className="font-medium mb-1.5 ml-1 text-foreground">
                    密码
                  </Text>
                  <View className="flex-row items-center  px-4 focus:border-3 rounded-2xl border  border-input bg-input/10 transition-all duration-300">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      className="mr-3 text-foreground"
                    />
                    <TextInput
                      className="flex-1 py-4 text-foreground placeholder:text-foreground"
                      placeholder="请输入密码"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={securePassword}
                    />
                    <TouchableOpacity
                      onPress={() => setSecurePassword(!securePassword)}
                    >
                      <Ionicons
                        name={
                          securePassword ? "eye-off-outline" : "eye-outline"
                        }
                        size={20}
                        color="#9ca3af"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View className="pt-14">
                {/* 主登录按钮 (增加 Icon 和圆角) */}
                <TouchableOpacity
                  className="flex-row py-4.5 rounded-2xl items-center justify-center mb-6  bg-foreground"
                  onPress={handleSignIn}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator className="text-background" />
                  ) : (
                    <Text className="text-background font-bold text-xl">
                      登录
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
