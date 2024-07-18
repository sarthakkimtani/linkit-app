import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import MainContent from "@/components/dashboard/MainContent";
import ErrorAlert from "@/components/ErrorAlert";

function DashboardPage() {
  const [error, setError] = useState<ErrorType>({ isError: false, description: "" });

  return (
    <>
      <Sidebar />
      <MainContent onError={setError} />
      <ErrorAlert error={error} />
    </>
  );
}

export default DashboardPage;
