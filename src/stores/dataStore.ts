import { api } from "@/api";
import { RoomList } from "@/api/type";
import { create } from "zustand";

interface DataState {
  roomList: RoomList[];
  getRoomList: () => Promise<void>;
  email: string;
  getEmail: (uid: string) => Promise<void>;
  roomInfo: any[];
  getRoomInfo: (roomId: string) => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  roomList: [],
  email: "",
  roomInfo: [],
  getRoomList: async () => {
    const { list: roomList } = await api.getRoomList();
    set({ roomList });
  },
  getEmail: async (uid: string) => {
    const { email } = await api.getEmail(uid);
    set({ email });
  },
  getRoomInfo: async (roomId: string) => {
    const platform = ["斗鱼", "虎牙"];
    const task = Promise.all(
      platform.map((item) => api.getRoomInfo(roomId, item)),
    );
    const roomInfo = await task;
    console.log(roomInfo);
    set({ roomInfo });
  },
}));
