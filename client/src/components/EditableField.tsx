import { useRef } from "react";
import { Pencil2Icon, CheckIcon } from "@radix-ui/react-icons";

interface EditableFieldProps {
  text: string;
  isEditable: boolean;
  onEdit: () => void;
  onUpdate: (newText: string) => void;
  className?: string;
}

function EditableField({ text, isEditable, onEdit, onUpdate, className }: EditableFieldProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleUpdate = () => {
    onUpdate(textRef.current!.innerText);
  };

  return (
    <div className="flex flex-row items-center">
      <p
        ref={textRef}
        contentEditable={isEditable}
        className={`text-sm whitespace-nowrap text-ellipsis ${className}`}
      >
        {text}
      </p>
      {isEditable ? (
        <CheckIcon onClick={handleUpdate} className="w-5 h-5 ml-2 cursor-pointer" />
      ) : (
        <Pencil2Icon onClick={onEdit} className="ml-2 cursor-pointer" />
      )}
    </div>
  );
}

export default EditableField;
