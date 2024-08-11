import { ComponentProps } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps extends ComponentProps<"input"> {
  labelName: string;
}

function InputField({ labelName, ...rest }: InputFieldProps) {
  return (
    <div className="grid w-full mb-3">
      <div className="flex flex-col items-start space-y-1.5">
        <Label htmlFor="name">{labelName}</Label>
        <Input {...rest} />
      </div>
    </div>
  );
}

export default InputField;
