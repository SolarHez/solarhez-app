import { api } from "@/api";
import { RoomList } from "@/api/type";
import { create } from "zustand";

interface DataState {
  roomList: RoomList[];
  getRoomList: () => Promise<void>;
  email: string;
  getEmail: (uid: string) => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  roomList: [],
  email: "",
  getRoomList: async () => {
    const { list: roomList } = await api.getRoomList();
    set({ roomList });
  },
  getEmail: async (uid: string) => {
    const { email } = await api.getEmail(uid);
    set({ email });
  },
}));
