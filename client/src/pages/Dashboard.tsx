import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import MainContent from "@/components/dashboard/MainContent";
import ErrorAlert from "@/components/ErrorAlert";

import useTitle from "@/hooks/useTitle";

function DashboardPage() {
  const [error, setError] = useState<ErrorType>({ isError: false, description: "" });
  useTitle("Dashboard - LinkIt");

  return (
    <>
      <Sidebar />
      <MainContent onError={setError} />
      <ErrorAlert error={error} />
    </>
  );
}

export default DashboardPage;
