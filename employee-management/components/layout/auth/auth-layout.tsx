import { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-4 min-h-screen">
      <div className="w-1/2 h-screen hidden md:block">
        <img src="/placeholder.svg" alt="banner" className="w-full h-full object-cover"/>
      </div>
      {children}
    </div>
  );
};
