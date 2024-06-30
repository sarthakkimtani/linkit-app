import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContext";

function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("Auth Context must be used inside its component tree");
  }

  return ctx;
}

export default useAuth;
