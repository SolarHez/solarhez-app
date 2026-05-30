import * as action from "./action";
import * as auth from "./auth";
import * as data from "./data";

export const api = { ...auth, ...data, ...action };
