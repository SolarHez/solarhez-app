import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";

const StyledIonicons = styled(Ionicons);

export default function AddRoomScreen() {
  return (
    <SafeAreaView>
      <ScrollView className="px-5">
        <View>
          <Text className="text-2xl font-bold text-foreground">
            添加直播间监听
          </Text>
        </View>
        <View className="bg-card p-5 rounded-2xl gap-5 my-5">
          <View className="text-foreground h-30 p-2 bg-muted rounded-2xl">
            <TextInput placeholder="支持房间号和直播间URL" multiline={true} />
          </View>
          <TouchableOpacity className="flex-row py-4 rounded-2xl items-center justify-center  bg-foreground gap-2">
            <StyledIonicons name="link" size={24} className="text-background" />
            <Text className="text-background font-bold text-xl">解析</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
