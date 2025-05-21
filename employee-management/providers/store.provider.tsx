"use client";

import store from "@services/store";
import { Provider } from "react-redux";
import { type ReactNode } from "react";

export function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}