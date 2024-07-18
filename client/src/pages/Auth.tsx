import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import AuthForm from "@/components/auth/AuthForm";
import AuthHeader from "@/components/auth/AuthHeader";
import useAuth from "@/hooks/useAuth";

import Logo from "@/assets/logo.svg";

function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.user) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="flex flex-col justify-center">
      <div className="flex mt-10 mb-10 justify-center">
        <img src={Logo} width={150} />
      </div>
      <div className="flex items-center justify-center">
        <Card className="w-4/5 md:w-1/2 lg:w-1/4">
          <AuthHeader authMode={authMode} setAuthMode={setAuthMode} />
          <AuthForm authMode={authMode} />
        </Card>
      </div>
    </div>
  );
}

export default AuthPage;
