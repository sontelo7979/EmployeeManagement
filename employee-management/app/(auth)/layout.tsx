import { Metadata } from "next";
import { ReactNode } from "react";
import { AuthLayout as RootAuthLayout } from "@components/layout/auth/auth-layout";

export const metadata: Metadata = {
  title: "Xác thực người dùng",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <RootAuthLayout>{children}</RootAuthLayout>;
}
