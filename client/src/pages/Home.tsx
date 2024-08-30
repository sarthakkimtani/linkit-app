import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

const HomePage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  }, [authState.user, navigate]);

  return null;
};

export default HomePage;
