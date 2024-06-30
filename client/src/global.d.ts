type AuthMode = "login" | "signup";

interface UserType {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: UserType | null;
  loading: boolean;
}

interface AuthContextType {
  authState: AuthState;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (credentials: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

interface Credentials {
  username: string;
  email: string;
  password: string;
}
