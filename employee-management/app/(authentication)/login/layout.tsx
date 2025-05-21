import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Đăng nhập - Hệ thống quản lý nhân sự",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="size-full relative bg-blue-200">{children}</div>;
}
