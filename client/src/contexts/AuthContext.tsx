import { createContext, useState, useEffect, ReactNode } from "react";

import axiosInstance, { setAccessToken } from "@/lib/axiosInstance";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ user: null, loading: true });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/me");
        setAuthState({ user: data.profile, loading: false });
      } catch (error) {
        setAuthState({ user: null, loading: false });
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const { data } = await axiosInstance.post("/auth/login", credentials);
    setToken(data.accessToken);
    setAccessToken(data.accessToken);
    setAuthState({ user: data.profile, loading: false });
  };

  const signup = async (credentials: { username: string; email: string; password: string }) => {
    const { data } = await axiosInstance.post("/auth/signup", credentials);
    setToken(data.accessToken);
    setAccessToken(data.accessToken);
    setAuthState({ user: data.profile, loading: false });
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setToken(null);
    setAccessToken(null);
    setAuthState({ user: null, loading: false });
  };

  const update = async (credentials: { username?: string; email?: string }) => {
    if (!credentials.username && !credentials.email) {
      return;
    }
    const userId = authState.user!.id;
    await axiosInstance.patch(`/user/${userId}`, credentials);
    const updatedUser = {
      ...authState.user!,
      username: credentials.username! || authState.user!.username,
      email: credentials.email! || authState.user!.email,
    };
    setAuthState({ user: updatedUser, loading: false });
  };

  const changePassword = async (credentials: { oldPassword: string; newPassword: string }) => {
    const userId = authState.user!.id;
    await axiosInstance.post(`/user/password/${userId}`, credentials);
  };

  useEffect(() => {
    setAccessToken(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout, update, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};
