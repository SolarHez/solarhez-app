import { api } from "@/api";
import { create } from "zustand";

interface ActionState {
  toggleRoomSate: (
    id: string,
    platform: string,
    is_listening: boolean,
  ) => Promise<any>;
  deleteRoomSate: (id: string, platform: string) => Promise<any>;
}

export const useActionStore = create<ActionState>((set) => ({
  toggleRoomSate: async (id, platform, is_listening) => {
    await api.toggleRoomSate(id, platform, is_listening);
  },
  deleteRoomSate: async (id, platform) => {
    await api.deleteRoomSate(id, platform);
  },
}));
