"use client";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";
import { useAuthContext } from "@providers/auth.provider";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function LoginPage() {
  const { login, isLoginLoading } = useAuthContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleLogin = useCallback(async () => {
    let isError = false;
    if (!username) {
      setUsernameError("Tên người dùng không được để trống.");
      isError = true;
    }
    if (!password) {
      setPasswordError("Mật khẩu không được để trống.");
      isError = true;
    }
    if (!isError) {
      console.log("Login")
      await login({ username, password });
    }
  }, [login]);

  return (
    <Card className="max-w-[90vw] max-h-[80vh] absolute top-1/2 left-1/2 -translate-1/2 w-[90vw] h-fit md:w-[25rem] md:h-fit border-0 border-t-3 border-blue-500">
      <CardHeader className="w-full">
        <CardTitle className="w-full text-nowrap font-bold text-2xl text-center">
          Đăng nhập vào hệ thống
        </CardTitle>
        <CardDescription className="w-full text-center text-sm">
          Vui lòng đăng nhập để tiếp tục
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="w-full">
        <div className="w-full grid grid-cols-1 mb-4">
          <Label className="col-span-1 mb-2 text-left text-sm font-semibold">
            Tên đăng nhập<span className="text-sm text-red-500">*</span>
          </Label>
          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Nhập tên đăng nhập..."
            className="text-sm w-full col-span-1 mb-1"
            aria-invalid={usernameError ? "true" : "false"}
          />
          <p className="text-sm text-red-500">{usernameError}</p>
        </div>
        <div className="w-full grid grid-cols-1 mb-4">
          <Label className="col-span-1 mb-2 text-left text-sm font-semibold">
            Mật khẩu <span className="text-sm text-red-500">*</span>
          </Label>
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Nhập mật khẩu đăng nhập..."
            aria-invalid={passwordError ? "true" : "false"}
            className="text-sm w-full col-span-1"
          />
          <p className="text-sm text-red-500">{passwordError}</p>
        </div>
        <Button
          className="rounded-full w-full mb-4"
          disabled={isLoginLoading}
          onClick={handleLogin}
        >
          {isLoginLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
        <Separator className="mb-4" />
        <p className="text-center text-sm text-black">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-blue-500 text-sm">
            Đăng ký ngay
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
