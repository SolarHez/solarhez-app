import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { useState } from "react";
import { isValidUrl, parseLiveUrl } from "@/utils/parse";
import { useDataStore } from "@/stores/dataStore";
import { calculateLiveDuration, formatTimestamp } from "@/utils/time";
import { useActionStore } from "@/stores/actionStore";
import { RoomList } from "@/api/type";
import Animated, { FadeInDown } from "react-native-reanimated";

const StyledIonicons = styled(Ionicons);

export default function AddRoomScreen() {
  const insets = useSafeAreaInsets();
  const [InputText, setInputText] = useState("");
  const getRoomInfo = useDataStore((state) => state.getRoomInfo);
  const roomInfo = useDataStore((state) => state.roomInfo);
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    setLoading(true);
    if (!InputText) return;
    if (!isValidUrl(InputText)) {
      await getRoomInfo(InputText);
      setLoading(false);
      return;
    }
    const { roomId } = parseLiveUrl(InputText);
    if (!roomId) return;
    await getRoomInfo(roomId);
    setLoading(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      automaticallyAdjustContentInsets={false}
    >
      <View className="bg-card px-4">
        <View
          style={{
            height: insets.top,
          }}
        ></View>
        <View className="flex-row items-center gap-2 h-14">
          <StyledIonicons
            name="add-circle"
            size={24}
            className="text-foreground items-center justify-center"
          />
          <Text className="text-2xl font-bold text-foreground justify-center items-center">
            添加直播间监听
          </Text>
        </View>
      </View>
      <View className="bg-card p-5 rounded-b-4xl gap-5 px-4 shadow-md">
        <View className="text-foreground h-30 p-2 bg-muted rounded-2xl">
          <TextInput
            className="text-foreground placeholder:text-muted-foreground"
            placeholder="支持房间号和直播间URL"
            multiline={true}
            value={InputText}
            onChangeText={setInputText}
          />
        </View>
        <TouchableOpacity
          className="flex-row h-12 rounded-2xl items-center justify-center  bg-foreground gap-2"
          onPress={handleParse}
          activeOpacity={0.6}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator className="text-background" />
          ) : (
            <>
              <StyledIonicons
                name="link"
                size={24}
                className="text-background"
              />
              <Text className="text-background font-bold text-xl">解析</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <View className="p-4">
        <Text className="text-muted-foreground">
          目前只支持斗鱼、虎牙直播平台
        </Text>
        <Text className="text-muted-foreground">
          例如：https://www.douyu.com/63136
        </Text>
      </View>
      {roomInfo.map((item) => (
        <RoomItem key={item.room_url} room={item} />
      ))}
    </ScrollView>
  );
}

const RoomItem = ({ room }: { room: RoomList }) => {
  const addRoomSate = useActionStore((state) => state.addRoomSate);
  const getRoomInfo = useDataStore((state) => state.getRoomInfo);
  const [loading, setLoading] = useState(false);
  const handleAddRoom = async () => {
    if (!room.room_id) return;
    setLoading(true);
    await addRoomSate(room);
    await getRoomInfo(room.room_id);
    setLoading(false);
  };

  if (!room.avatar) return null;
  return (
    <Animated.View
      entering={FadeInDown.duration(800)}
      key={room.id}
      className="my-2 rounded-4xl  bg-card border border-foreground/10 gap-2 mx-4 shadow-md"
    >
      <View className="rounded-4xl">
        <Image
          source={{ uri: room.pic }}
          className="w-full h-55 rounded-t-4xl"
        />
        <View className="flex-row items-center justify-between gap-4">
          <Text className="text-foreground text-xl font-bold p-2">
            {room.title}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-4 px-4 pb-4">
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
            <TouchableOpacity
              activeOpacity={0.6}
              className={`flex-row py-2 rounded-2xl items-center justify-center gap-1 px-4  ${room.roomExists ? "bg-primary-foreground" : "bg-foreground"}`}
              onPress={handleAddRoom}
            >
              {loading ? (
                <ActivityIndicator className="text-background" />
              ) : (
                <>
                  {room.roomExists ? null : (
                    <StyledIonicons
                      name="add"
                      size={24}
                      className="text-background"
                    />
                  )}
                  <Text
                    className={`text-background font-bold ${room.roomExists ? "text-foreground" : "text-primary-foreground"}`}
                  >
                    {room.roomExists ? "已添加" : "添加"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
