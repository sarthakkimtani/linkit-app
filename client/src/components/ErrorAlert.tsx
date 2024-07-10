import { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ErrorAlert({ error }: { error: ErrorType }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error.isError) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [error.isError]);

  return (
    <div
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 transition-transform ${
        show ? "translate-y-0 mb-10" : "translate-y-40"
      }`}
    >
      <Alert variant="destructive" className="w-4/5 md:w-96 bg-destructive text-white">
        <ExclamationTriangleIcon color="white" className="h-5 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.description}</AlertDescription>
      </Alert>
    </div>
  );
}

export default ErrorAlert;
