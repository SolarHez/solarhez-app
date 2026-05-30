import { api } from "@/api";
import { RoomList } from "@/api/type";
import { create } from "zustand";

interface DataState {
  roomList: RoomList[];
  getRoomList: () => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  roomList: [],
  getRoomList: async () => {
    const { list: roomList } = await api.getRoomList();
    set({ roomList });
  },
}));
