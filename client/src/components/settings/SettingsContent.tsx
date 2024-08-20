import { AxiosError } from "axios";
import { useState } from "react";
import { PaperPlaneIcon, Pencil1Icon } from "@radix-ui/react-icons";

import ChangePasswordButton from "@/components/settings/ChangePasswordButton";
import SuccessAlert from "@/components/SuccessAlert";
import ErrorAlert from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAuth from "@/hooks/useAuth";

interface AccountInfo {
  username: string;
  email: string;
}

function SettingsContent() {
  const { authState, update } = useAuth();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>({ isError: false, description: "" });
  const [success, setSuccess] = useState<SuccessType>({ isSuccess: false, description: "" });
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    username: authState.user!.username,
    email: authState.user!.email,
  });

  const enableEditMode = () => setEditMode(true);

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo({
      ...accountInfo,
      email: e.target.value,
    });
  };
  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo({
      ...accountInfo,
      username: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!editMode) {
        return;
      }
      const isUsernameChanged = accountInfo.username !== authState.user?.username;
      const isEmailChanged = accountInfo.email !== authState.user?.email;
      if (!isUsernameChanged && !isEmailChanged) {
        return;
      }

      const payload = {
        username: isUsernameChanged ? accountInfo.username : undefined,
        email: isEmailChanged ? accountInfo.email : undefined,
      };
      await update(payload);
      setEditMode(false);
      setSuccess({ isSuccess: true, description: "Profile updated successfully!" });
    } catch (err) {
      if (err instanceof AxiosError) {
        setError({ isError: true, description: err.response!.data.error });
      }
    }
  };

  return (
    <div className="flex flex-col p-12 w-full">
      <ErrorAlert error={error} />
      <SuccessAlert success={success} />
      <h1 className="text-xl font-bold mb-7">My Account</h1>
      <div className="flex flex-col w-1/3">
        <div className="flex flex-row items-center justify-between mb-6">
          <h4 className="text-lg font-medium">Username</h4>
          <Input
            className="bg-[#2C2A2C] w-3/5 h-[45px]"
            placeholder="username"
            value={accountInfo.username}
            onChange={usernameChangeHandler}
            disabled={!editMode}
          />
        </div>
        <div className="flex flex-row items-center justify-between mb-6">
          <h4 className="text-lg font-medium">Email</h4>
          <Input
            className="bg-[#2C2A2C] w-3/5 h-[45px]"
            placeholder="username"
            type="email"
            value={accountInfo.email}
            onChange={emailChangeHandler}
            disabled={!editMode}
            required
          />
        </div>
        <div className="flex flex-row items-center justify-between mb-6">
          <h4 className="text-lg font-medium">Password</h4>
          <ChangePasswordButton onSuccess={setSuccess} onError={setError} />
        </div>
        <div className="flex flex-row items-center mt-6">
          <Button
            variant="secondary"
            className="bg-accent hover:bg-accent mr-5"
            onClick={enableEditMode}
          >
            <div className="flex flex-row items-center">
              <Pencil1Icon className="mr-2" />
              <span>Edit</span>
            </div>
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            <div className="flex flex-row items-center">
              <PaperPlaneIcon className="mr-2" />
              <span>Save</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingsContent;
