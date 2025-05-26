import { LoginSection } from "@components/auth/login-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
}

const LoginPage = () => {
  return <div className="w-full h-full md:w-1/2">
    <LoginSection />
  </div>
}

export default LoginPage;