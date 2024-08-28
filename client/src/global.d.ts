type AuthMode = "login" | "signup";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

interface AuthContextType {
  authState: AuthState;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (credentials: { username: string; email: string; password: string }) => Promise<void>;
  update: (credentials: { username?: string; email?: string }) => Promise<void>;
  changePassword: (credentials: { oldPassword: string; newPassword: string }) => Promise<void>;
  logout: () => Promise<void>;
}

interface Credentials {
  username: string;
  email: string;
  password: string;
}

interface ErrorType {
  isError: boolean;
  description: string;
}

interface SuccessType {
  isSuccess: boolean;
  description: string;
}

interface Link {
  id: string;
  url: string;
  title: string;
  order: number;
}
