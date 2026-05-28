import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/hooks/useAuth";
import { Button, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { signIn } = useAuth();
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full p-4">
        <View className="p-5 gap-5">
          <ThemedText type="title">Sign In</ThemedText>
          <Button
            title="Sign in"
            onPress={() => signIn("SolarHez@gmail.com", "123456789")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
