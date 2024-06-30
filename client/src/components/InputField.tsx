import { ComponentProps } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps extends ComponentProps<"input"> {
  labelName: string;
}

export function InputField({ labelName, ...rest }: InputFieldProps) {
  return (
    <div className="grid w-full items-center mb-3">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">{labelName}</Label>
        <Input className="bg-background" {...rest} />
      </div>
    </div>
  );
}
