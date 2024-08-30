import { useState, useEffect } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SuccessAlert({ success }: { success: SuccessType }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (success.isSuccess) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [success.isSuccess]);

  return (
    <div
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 transition-transform ${
        show ? "translate-y-0 mb-10" : "translate-y-40"
      }`}
    >
      <Alert variant="default" className="w-4/5 md:w-96 bg-green-600 text-white">
        <CheckCircledIcon color="white" className="h-5 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{success.description}</AlertDescription>
      </Alert>
    </div>
  );
}

export default SuccessAlert;
