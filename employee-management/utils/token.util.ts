import { ILoginResponse } from "@services/types";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "./local-storage.util";

export const getAccessToken = (): string | null => {
  return getFromLocalStorage("accessToken");
}

export const setAccessToken = (token: string): void => {
  setToLocalStorage("accessToken", token);
};

export const removeAccessToken = (): void => {
  removeFromLocalStorage("accessToken");
};

export const getRefreshToken = (): string | null => {
  return getFromLocalStorage("refreshToken");
}

export const setRefreshToken = (token: string): void => {
  setToLocalStorage("refreshToken", token);
}

export const removeRefreshToken = (): void => {
  removeFromLocalStorage("refreshToken");
};

export const getTokens = (): ILoginResponse => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return {
    accessToken: accessToken || "",
    refreshToken: refreshToken || "",
  };
}

export const setTokens = (tokens: ILoginResponse): void => {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
};

export const removeTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};
