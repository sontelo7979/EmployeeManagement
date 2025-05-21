"use client";

import { useLoginMutation } from "@services/apis";
import { ILoginRequest } from "@services/types";
import { getToken, removeToken, setToken } from "@utils/token.util";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

type AuthContextType = {
  login: (body: ILoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoginLoading: boolean;
  currentToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentToken, setCurrentToken] = useState<string | null>(getToken());
  const authCheckRef = useRef(false);

  const saveToken = useCallback(
    (token: string) => {
      setToken(token);
      setCurrentToken(token);
    },
    [setToken]
  );

  const revokeToken = useCallback(() => {
    removeToken();
    setCurrentToken(null);
  }, [removeToken]);

  const login = useCallback(
    async (body: ILoginRequest) => {
      try {
        const { token } = await loginMutation(body).unwrap();
        if (!token) {
          toast.error("Đăng nhập thất bại.", {
            description: "Thông tin đăng nhập không chính xác.",
          });
        } else {
          toast.success("Đăng nhập thành công.");
          authCheckRef.current = false;
          saveToken(token);
          setIsAuthenticated(true);
          if (pathname !== "/login") router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    revokeToken();
    setIsAuthenticated(false);
    if (pathname !== "/login") router.push("/login");
  }, [revokeToken, pathname, router]);

  useEffect(() => {
    if (authCheckRef.current) return;

    const checkAuth = async () => {
      authCheckRef.current = true;
      if (!currentToken) {
        logout();
        return;
      }
    };

    if (currentToken) checkAuth();
  }, [currentToken, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoginLoading,
        isAuthenticated,
        currentToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
