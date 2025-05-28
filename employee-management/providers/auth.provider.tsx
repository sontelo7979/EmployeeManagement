"use client";

import { useLazyGetCurrentQuery, useLoginMutation, useLogoutMutation } from "@services/apis";
import { ILoginRequest, IUser } from "@services/types";
import { getFromLocalStorage, setToLocalStorage } from "@utils/local-storage.util";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setTokens,
} from "@utils/token.util";
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
  isAuthenticated: boolean | null;
  isAuthenticating: boolean;
  currentAccessToken: string | null;
  currentRefreshToken: string | null;
  currentUser: IUser | null;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    getFromLocalStorage<boolean>("isAuthenticated") || false
  );
  const [currentAccessToken, setCurrentAccessToken] = useState<string | null>(
    getAccessToken() || null
  );
  const [currentRefreshToken, setCurrentRefreshToken] = useState<string | null>(
    getRefreshToken() || null
  );
  const [currentUser, setCurrentUser] = useState<IUser | null>(
    getFromLocalStorage<IUser>("currentUser") || null
  );
  const authCheckRef = useRef(false);

  const saveTokens = useCallback(
    (accessToken: string, refreshToken: string) => {
      setCurrentAccessToken(accessToken);
      setCurrentRefreshToken(refreshToken);
      setTokens({ accessToken, refreshToken });
    },
    [setCurrentAccessToken, setCurrentRefreshToken, setTokens]
  );

  const revokeTokens = useCallback(() => {
    setCurrentAccessToken(null);
    setCurrentRefreshToken(null);
    removeTokens();
  }, [setCurrentAccessToken, setCurrentRefreshToken, removeTokens]);

  const login = useCallback(
    async (body: ILoginRequest) => {
      try {
        const { message, data, statusCode } = await loginMutation(
          body
        ).unwrap();
        if (statusCode === 200) {
          setIsAuthenticated(true);
          saveTokens(data.accessToken, data.refreshToken);
          if (pathname === "/login") router.push("/");
        } else {
          setIsAuthenticated(false);
          revokeTokens();
          if (pathname !== "/login") router.push("/login");
          toast.error("Login failed: ", {
            description: message || "An error occurred during login.",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [loginMutation]
  );

  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const logout = useCallback(async () => {
    revokeTokens();
    setIsAuthenticated(false);
    try {
      const { message, statusCode } = await logoutMutation().unwrap();
      if (statusCode === 200) {
        setCurrentUser(null);
        toast.success("Logout successful", {
          description: message || "You have been logged out successfully.",
        });
        if (pathname !== "/login") router.push("/login");
        authCheckRef.current = false;
      } else {
        toast.error("Logout failed: ", {
          description: message || "An error occurred during logout.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [revokeTokens, pathname, router]);

  const [getCurrentUser, { isLoading: isGettingInfo }] =
    useLazyGetCurrentQuery();

  useEffect(() => {
    if (authCheckRef.current) return;

    const checkAuth = async () => {
      authCheckRef.current = true;
      if (!currentAccessToken || !currentRefreshToken) {
        if (isAuthenticated) await logout();
        return;
      }

      try {
        const {statusCode, data, message } = await getCurrentUser().unwrap();
        if (statusCode === 200) {
          setCurrentUser(data);
          setToLocalStorage("currentUser", data);
          setIsAuthenticated(true);
          setToLocalStorage("isAuthenticated", true);
          setTokens({
            accessToken: currentAccessToken,
            refreshToken: currentRefreshToken,
          });
          if (pathname === "/login") router.push("/");
        }
      }catch(error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (currentRefreshToken && currentRefreshToken) checkAuth();
  }, [currentAccessToken, currentRefreshToken, currentUser, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        isAuthenticating: isLoginLoading || isGettingInfo || isLogoutLoading,
        currentAccessToken,
        currentRefreshToken,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
