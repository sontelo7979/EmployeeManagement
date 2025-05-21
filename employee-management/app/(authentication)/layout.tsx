import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Xác thực người dùng",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="w-screen h-screen relative">{children}</div>;
}
