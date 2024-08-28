import { useState } from "react";

import EditableField from "@/components/dashboard/EditableField";

import DragIcon from "@/assets/drag.svg";
import BinIcon from "@/assets/bin.svg";
import CheckIcon from "@/assets/check.svg";
import EditIcon from "@/assets/edit.svg";

interface EditLinkProps {
  link: Link;
  onDelete: (link: Link) => Promise<void>;
  onUpdate: (oldLink: Link, newLink: Link) => Promise<void>;
}

function EditLink({ link, onDelete, onUpdate }: EditLinkProps) {
  const [data, setData] = useState<Link>(link);
  const [editable, setEditable] = useState<boolean>(false);

  const updateTitle = (newTitle: string) => setData({ ...data, title: newTitle });
  const updateUrl = (newUrl: string) => setData({ ...data, url: newUrl });

  const toggleEditable = async () => {
    if (editable == true) {
      await onUpdate(link, data);
    }
    setEditable((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full lg:w-8/12 bg-accent px-4 py-6 mb-6 text-black rounded-3xl">
      <div className="flex flex-row items-center">
        <img src={DragIcon} width={20} alt="drag-icon" />
        <div className="flex-col w-[88%] ml-3">
          <EditableField
            text={data.title}
            type="text"
            isEditable={editable}
            onUpdate={updateTitle}
            className="w-[200px] font-semibold"
          />
          <EditableField
            text={data.url}
            type="url"
            isEditable={editable}
            onUpdate={updateUrl}
            className="w-[200px]"
          />
        </div>
        <img
          src={editable ? CheckIcon : EditIcon}
          onClick={toggleEditable}
          className="cursor-pointer w-5 mt-1̀ mr-3"
          alt="edit-mode"
        />
        <img
          src={BinIcon}
          onClick={() => onDelete(link)}
          className="cursor-pointer w-5 mr-3"
          alt="bin-icon"
        />
      </div>
    </div>
  );
}

export default EditLink;
