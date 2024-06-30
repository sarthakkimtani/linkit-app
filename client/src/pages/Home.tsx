import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  return null;
};

export default HomePage;
