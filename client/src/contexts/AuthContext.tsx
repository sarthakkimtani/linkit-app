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

  useEffect(() => {
    setAccessToken(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
