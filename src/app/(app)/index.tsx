import { useDataStore } from "@/stores/dataStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  ScrollView,
  Switch,
  RefreshControl,
  TextInput,
  useColorScheme,
  Platform,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { calculateLiveDuration, formatTimestamp } from "@/utils/time";
import { styled } from "nativewind";
import { useAuthStore } from "@/stores";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useActionStore } from "@/stores/actionStore";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";

const StyledMaterialIcons = styled(MaterialIcons);
const StyledIonicons = styled(Ionicons);
const StyledBlurView = styled(BlurView as any);

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const roomList = useDataStore((state) => state.roomList);
  const getRoomList = useDataStore((state) => state.getRoomList);
  const user = useAuthStore((state) => state.user);
  const listLength = roomList?.length || 0;
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredRoomList = useMemo(() => {
    if (!searchText) {
      return roomList;
    }
    return roomList.filter((room: any) => {
      const searchLower = searchText.toLowerCase();
      const nameMatch = room.name?.toLowerCase().includes(searchLower);
      const ridMatch = room.room_id?.toLowerCase().includes(searchLower);

      return nameMatch || ridMatch; // 名字匹配 或者 ID 匹配 都可以
    });
  }, [searchText, roomList]);

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
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      stickyHeaderIndices={[0]}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      automaticallyAdjustContentInsets={false}
    >
      <StyledBlurView
        intensity={90}
        tint={colorScheme === "dark" ? "dark" : "light"}
        className={`p-2 gap-2 ${Platform.OS === "ios" ? "" : "bg-card"}`}
      >
        <View
          style={{
            height: insets.top,
          }}
        ></View>
        <HeaderTitle user={user} listLength={listLength} />
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
      </StyledBlurView>
      <Animated.View entering={FadeInDown.duration(1500)} className="py-4 px-2">
        {filteredRoomList?.map((room) => (
          <RoomItem room={room} key={room.room_url} />
        ))}
      </Animated.View>
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
      <Link href="/setting">
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
      </Link>
    </View>
  );
};

const SearchInput = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) => {
  return (
    <View className="flex-row items-center  px-4 bg-card/50 rounded-2xl  mx-2 border border-foreground/10 transition-all duration-300">
      <Ionicons
        name="search"
        size={20}
        className="mr-3 text-muted-foreground"
      />
      <TextInput
        className="flex-1 py-4 text-foreground placeholder:text-muted-foreground"
        placeholder="搜索直播间"
        autoCapitalize="none"
        keyboardType="email-address"
        value={searchText}
        onChangeText={setSearchText}
      />
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
      className=" p-4 m-1 rounded-4xl  bg-card border border-foreground/10 gap-2 shadow-xs"
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
            <Text className="text-muted-foreground text-sm ">
              {room.platform}
            </Text>
          </View>
          <View>
            <Switch
              value={isJoined}
              onValueChange={async (value) => {
                setIsJoined(value);
                await toggleRoomSate(room.room_id, room.platform, value);
                await getRoomList();
              }}
              trackColor={{ false: "gray", true: "green" }}
              thumbColor={isJoined ? "#ffffff" : "#ffffff"}
            />
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between gap-4">
        <Text className="text-foreground font-bold px-2">{room.title}</Text>
        <StyledMaterialIcons
          name="delete-outline"
          size={20}
          className="text-muted-foreground"
          onPress={async () => {
            await deleteRoomSate(room.room_id, room.platform);
            await getRoomList();
          }}
        />
      </View>
      <View className="bg-muted rounded-2xl py-6 px-4 gap-3">
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
