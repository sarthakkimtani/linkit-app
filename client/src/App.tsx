import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/Home";
import AuthPage from "@/pages/Auth";
import DashboardPage from "@/pages/Dashboard";
import NotFoundPage from "@/pages/NotFound";
import ProfilePage from "@/pages/Profile";
import AccountPage from "@/pages/Settings";

import useAuth from "@/hooks/useAuth";

const App = () => {
  const { authState } = useAuth();

  if (authState.loading) {
    return <></>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/u/:id" element={<ProfilePage />} />
        <Route
          path="/dashboard"
          element={authState.user ? <DashboardPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/settings"
          element={authState.user ? <AccountPage /> : <Navigate to="/auth" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
