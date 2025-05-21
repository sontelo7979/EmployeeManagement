import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "./local-storage.util";

export const getToken = () => {
  return getFromLocalStorage<string>("token");
};

export const setToken = (token: string) => {
  setToLocalStorage("token", token);
};

export const removeToken = () => {
  removeFromLocalStorage("token");
};
