import React, { useState } from "react";
import { AxiosError } from "axios";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";

import useAuth from "@/hooks/useAuth";

function ChangePasswordButton({
  onSuccess,
  onError,
}: {
  onSuccess: React.Dispatch<React.SetStateAction<SuccessType>>;
  onError: React.Dispatch<React.SetStateAction<ErrorType>>;
}) {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const { changePassword } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setOpen(false);
      await changePassword(data);
      onSuccess({ isSuccess: true, description: "Password changed successfully!" });
    } catch (err) {
      if (err instanceof AxiosError) {
        onError({ isError: true, description: err.response!.data.error });
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="h-[40px] bg-accent hover:bg-accent">
          Change Password
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">Change your account password</AlertDialogTitle>
            <AlertDialogDescription className="text-foreground">
              <InputField
                name="oldPassword"
                labelName="Old Password"
                type="password"
                placeholder="Enter old password"
                className="bg-[#2C2A2C]"
                onChange={handleChange}
                required
              />
              <InputField
                name="newPassword"
                labelName="New Password"
                type="password"
                placeholder="Enter new password"
                className="bg-[#2C2A2C]"
                onChange={handleChange}
                required
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-5">
            <AlertDialogCancel className="hover:bg-background hover:text-white">
              Cancel
            </AlertDialogCancel>
            <Button>Continue</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ChangePasswordButton;
