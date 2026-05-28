export type Session = {
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
