import { CardHeader, CardTitle } from "@/components/ui/card";

interface AuthHeaderProps {
  authMode: AuthMode;
  setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

function AuthHeader({ authMode, setAuthMode }: AuthHeaderProps) {
  const classNames = "cursor-pointer text-primary underline underline-offset-4";

  const toggleAuth = (mode: AuthMode) => setAuthMode(mode);

  return (
    <CardHeader>
      <CardTitle className=" flex flex-row justify-evenly mb-1">
        <div className="w-1/2 text-center">
          <a
            onClick={() => toggleAuth("login")}
            className={authMode === "login" ? classNames : "cursor-pointer"}
          >
            Login
          </a>
        </div>
        <div className="w-1/2 text-center">
          <a
            onClick={() => toggleAuth("signup")}
            className={authMode === "signup" ? classNames : "cursor-pointer"}
          >
            Signup
          </a>
        </div>
      </CardTitle>
    </CardHeader>
  );
}

export default AuthHeader;
