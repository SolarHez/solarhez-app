import { AnimatedIcon } from "@/components/animated-icon";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <AnimatedIcon />
      <Text>Expo SolarHez App</Text>
    </View>
  );
}
