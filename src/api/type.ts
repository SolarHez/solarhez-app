export type SessionResponse = {
  session?: SessionClass;
  user?: User;
};

export type SessionClass = {
  expiresAt?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  userId?: string;
  id?: string;
};

export type User = {
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: null;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
};

export type RoomListResponse = {
  success?: boolean;
  list?: RoomList[];
};

export type RoomList = {
  id?: string;
  platform?: string;
  room_id?: string;
  is_live?: boolean;
  name?: string;
  title?: string;
  room_url?: string;
  is_listening?: boolean;
  avatar?: string;
  pic?: string;
  stime?: string;
  etime?: string;
  last_notified_at?: string;
  created_at?: string;
  updated_at?: string;
};
