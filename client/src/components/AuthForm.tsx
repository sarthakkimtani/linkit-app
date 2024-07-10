import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import ErrorAlert from "@/components/ErrorAlert";
import useAuth from "@/hooks/useAuth";
import { AxiosError } from "axios";

function AuthForm({ authMode }: { authMode: AuthMode }) {
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>({ isError: false, description: "" });
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    email: "",
    password: "",
  });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setError({ ...error, isError: false });
    try {
      if (credentials !== null && authMode === "login")
        await login({ email: credentials.email, password: credentials.password });
      else if (credentials !== null && authMode === "signup")
        await signup({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        });
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError({ isError: true, description: err.response!.data.error });
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent>
        {authMode === "signup" && (
          <InputField
            type="text"
            name="username"
            labelName="Username"
            placeholder="Eg. abcxyz"
            onChange={handleChange}
            required
          />
        )}
        <InputField
          type="email"
          name="email"
          labelName="Email"
          placeholder="Eg. abc@xyz.com"
          onChange={handleChange}
          required
        />
        <InputField
          type="password"
          name="password"
          labelName="Password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button disabled={isDisabled}>Submit</Button>
      </CardFooter>
      <ErrorAlert error={error} />
    </form>
  );
}

export default AuthForm;
