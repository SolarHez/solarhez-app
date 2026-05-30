import axios from "axios";
import { RoomList, RoomListResponse } from "./type";

const authClient = axios.create({
  baseURL: "https://live.not7.cc/api/",
  headers: {
    Origin: "https://live.not7.cc",
    Referer: "https://live.not7.cc/",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

async function toggleRoomSate(
  id: string,
  platform: string,
  is_listening: boolean,
): Promise<RoomListResponse> {
  try {
    const { data } = await authClient.get("room/toggle", {
      params: {
        id,
        p: platform,
        s: is_listening.toString(),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function deleteRoomSate(
  id: string,
  platform: string,
): Promise<RoomListResponse> {
  try {
    const { data } = await authClient.get("room/del", {
      params: {
        id,
        p: platform,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function addRoomSate(roomData: RoomList) {
  try {
    const { data } = await authClient.post("room/add", roomData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export { addRoomSate, deleteRoomSate, toggleRoomSate };
