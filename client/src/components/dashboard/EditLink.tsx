import { useState } from "react";

import EditableField from "@/components/dashboard/EditableField";

import DragIcon from "@/assets/drag.svg";
import BinIcon from "@/assets/bin.svg";

interface EditLinkPropTypes {
  link: Link;
  onDelete: (link: Link) => void;
  onUpdate: (oldLink: Link, newLink: Link) => void;
}

function EditLink({ link, onDelete, onUpdate }: EditLinkPropTypes) {
  const [titleEditable, setTitleEditable] = useState<boolean>(false);
  const [urlEditable, setUrlEditable] = useState<boolean>(false);

  const updateTitle = (newTitle: string) => {
    const newLink = { id: link.id, title: newTitle, url: link.url };
    setTitleEditable(false);
    onUpdate(link, newLink);
  };

  const updateUrl = (newUrl: string) => {
    const newLink = { id: link.id, title: link.title, url: newUrl };
    setUrlEditable(false);
    onUpdate(link, newLink);
  };

  return (
    <div className="flex flex-col w-full lg:w-8/12 bg-accent px-4 py-6 mb-6 text-black rounded-3xl">
      <div className="flex flex-row items-center">
        <img
          src={DragIcon}
          className="cursor-grab active:cursor-grabbing"
          width={20}
          alt="drag-icon"
        />
        <div className="flex-col w-[88%] ml-3">
          <EditableField
            text={link.title}
            isEditable={titleEditable}
            onEdit={() => setTitleEditable(true)}
            onUpdate={updateTitle}
            className="font-semibold"
          />
          <EditableField
            text={link.url}
            isEditable={urlEditable}
            onEdit={() => setUrlEditable(true)}
            onUpdate={updateUrl}
          />
        </div>
        <img
          src={BinIcon}
          onClick={() => onDelete(link)}
          className="cursor-pointer w-5"
          alt="bin-icon"
        />
      </div>
    </div>
  );
}

export default EditLink;
