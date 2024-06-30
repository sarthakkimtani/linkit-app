import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "@/pages/Auth";
import DashboardPage from "@/pages/Dashboard";
import HomePage from "@/pages/Home";
import useAuth from "@/hooks/useAuth";

const App = () => {
  const { authState } = useAuth();

  if (authState.loading) {
    return <></>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={authState.user ? <DashboardPage /> : <Navigate to="/auth" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
