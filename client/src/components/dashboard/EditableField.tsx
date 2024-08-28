interface EditableFieldProps {
  text: string;
  isEditable: boolean;
  type: React.HTMLInputTypeAttribute;
  onUpdate: (param: string) => void;
  className?: string;
}

function EditableField({ text, isEditable, type, onUpdate, className }: EditableFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(e.target.value);
  };

  return (
    <div className="flex flex-row items-center">
      <input
        type={type}
        disabled={!isEditable}
        value={text}
        onChange={handleChange}
        className={`text-sm bg-accent whitespace-nowrap text-ellipsis ${
          isEditable ? "border-[1px] border-gray-700" : null
        } ${className}`}
      />
    </div>
  );
}

export default EditableField;
