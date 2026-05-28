import { api } from "@/api";
import { Session } from "@/api/type";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestScreen() {
  const { session, signIn, signOut, getSession, isAuthenticated } = useAuth();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full p-4">
        <View className="flex-1 gap-2">
          <Text>
            {session?.user?.name
              ? `Hello ${session?.user?.name} !`
              : "请先登录！"}
          </Text>
          <Button
            title="Sign in"
            onPress={() => signIn("SolarHez@gmail.com", "123456789")}
          />
          <Button title="Sign out" onPress={signOut} />
          <Button title="Get session" onPress={() => getSession()} />
          <Button title="Get room list" onPress={() => api.getRoomList()} />
          <Button
            title="Get room info"
            onPress={() => api.getRoomInfo("71415", "斗鱼")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
