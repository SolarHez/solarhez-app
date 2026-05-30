import { useDataStore } from "@/stores/dataStore";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  ScrollView,
  Switch,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { calculateLiveDuration, formatTimestamp } from "@/utils/time";
import { styled } from "nativewind";
import { useAuthStore } from "@/stores";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useActionStore } from "@/stores/actionStore";

const StyledMaterialIcons = styled(MaterialIcons);
const StyledIonicons = styled(Ionicons);

export default function HomeScreen() {
  const roomList = useDataStore((state) => state.roomList);
  const getRoomList = useDataStore((state) => state.getRoomList);
  const user = useAuthStore((state) => state.user);
  const listLength = roomList?.length || 0;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getRoomList();
  }, [getRoomList]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    getRoomList().finally(() => {
      setRefreshing(false);
    });
  }, []);

  if (listLength === 0) {
    return <ActivityIndicator className="flex-1" />;
  }

  return (
    <ScrollView
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          progressViewOffset={100}
        />
      }
    >
      <SafeAreaView>
        <Animated.View entering={FadeInUp.duration(500)}>
          <HeaderTitle user={user} listLength={listLength} />
          {roomList.map((room) => (
            <RoomItem room={room} key={room.id} />
          ))}
        </Animated.View>
      </SafeAreaView>
    </ScrollView>
  );
}

const HeaderTitle = ({
  user,
  listLength,
}: {
  user: any;
  listLength: number;
}) => {
  return (
    <View className="flex-row items-between justify-between gap-4 mb-4 px-2">
      <View className="gap-2">
        <Text className="text-4xl font-bold text-foreground">监听列表</Text>
        <Text className="text-foreground/50 text-sm">
          共 {listLength} 个直播间
        </Text>
      </View>
      <View>
        <Image
          source={{
            uri: user?.image || `https://github.com/shadcn.png`,
          }}
          style={{ width: 40, height: 40 }}
          borderRadius={20}
          className="border-2 border-foreground/20"
        />
      </View>
    </View>
  );
};

const RoomItem = ({ room }: { room: any }) => {
  const [isJoined, setIsJoined] = useState(room.is_listening || false);
  const toggleRoomSate = useActionStore((state) => state.toggleRoomSate);
  const deleteRoomSate = useActionStore((state) => state.deleteRoomSate);
  const getRoomList = useDataStore((state) => state.getRoomList);
  return (
    <View
      key={room.id}
      className=" p-4 m-1 rounded-4xl  bg-background border border-foreground/10 gap-2 shadow-xs"
    >
      <View className="flex-row items-center gap-4">
        <Image
          source={{ uri: room.avatar }}
          style={{ width: 40, height: 40 }}
          borderRadius={20}
          className={`border-2 ${room.is_live == true ? "border-green-500" : "border-foreground/20"}`}
        />
        <View className="flex-row justify-between flex-1">
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-foreground text-xl font-bold">
                {room.name}
              </Text>
              <Text
                className={
                  room.is_live == true
                    ? "text-green-500 text-sm font-bold"
                    : "text-foreground/50 text-sm font-bold"
                }
              >
                {room.is_live == true ? "直播中" : "未直播"}
              </Text>
            </View>
            <Text className="text-foreground/50 text-sm ">{room.platform}</Text>
          </View>
          <View>
            <Switch
              value={isJoined}
              onValueChange={async (value) => {
                setIsJoined(value);
                await toggleRoomSate(room.room_id, room.platform, value);
                await getRoomList();
              }}
              trackColor={{ false: "#3f3f46", true: "green" }}
              thumbColor={isJoined ? "#ffffff" : "#a1a1aa"}
            />
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between gap-4">
        <Text className="text-foreground font-bold">{room.title}</Text>
        <StyledMaterialIcons
          name="delete-outline"
          size={20}
          className="text-foreground/50"
          onPress={async () => {
            await deleteRoomSate(room.room_id, room.platform);
            await getRoomList();
          }}
        />
      </View>
      <View className="bg-foreground/5 rounded-2xl py-6 px-4 gap-3">
        <View className="flex-row items-center gap-1">
          <StyledIonicons
            name="time-outline"
            size={18}
            className="text-foreground"
          />
          <Text className="text-foreground font-medium">
            开播：{formatTimestamp(room.stime)}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <StyledIonicons
            name="time-outline"
            size={18}
            className="text-foreground"
          />
          <Text className="text-foreground font-medium">
            时长：{calculateLiveDuration(room.stime)}
          </Text>
        </View>
      </View>
    </View>
  );
};
