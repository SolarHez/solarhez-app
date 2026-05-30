import axios from "axios";
import { RoomListResponse } from "./type";

const authClient = axios.create({
  baseURL: "https://live.not7.cc/api/",
  headers: {
    Origin: "https://live.not7.cc",
    Referer: "https://live.not7.cc/",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

async function getRoomList(): Promise<RoomListResponse> {
  try {
    const { data } = await authClient.get("room/all");
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getRoomInfo(id: string, p: string) {
  try {
    const { data } = await authClient.get("room", {
      params: {
        id,
        p,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getEmail(uid: string) {
  try {
    const { data } = await authClient.get("mail/get", {
      params: {
        uid,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getEmail, getRoomInfo, getRoomList };
