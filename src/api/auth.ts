import axios from "axios";
import { SessionResponse } from "./type";

const authClient = axios.create({
  baseURL: "https://live.not7.cc/api/",
  headers: {
    Origin: "https://live.not7.cc",
    Referer: "https://live.not7.cc/",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

async function signIn(
  email: string,
  password: string,
): Promise<SessionResponse> {
  try {
    const { data } = await authClient.post("auth/sign-in/email", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function signOut() {
  try {
    const { data } = await authClient.post("auth/sign-out", {});
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getSession() {
  try {
    const { data } = await authClient.get("auth/get-session");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getSession, signIn, signOut };
