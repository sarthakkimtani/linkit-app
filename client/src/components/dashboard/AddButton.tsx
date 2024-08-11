import React, { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

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

function AddButton({ addLink }: { addLink: (link: Link) => void }) {
  const [open, setOpen] = useState<boolean>(false);
  const [link, setLink] = useState<Link>({ id: "", title: "", url: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink({
      ...link,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLink(link);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center w-full lg:w-8/12 bg-accent hover:bg-accent py-5 rounded-3xl">
          <PlusIcon className="mr-1" />
          Add Link
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">Create a new Link</AlertDialogTitle>
            <AlertDialogDescription className="text-foreground">
              <InputField
                name="title"
                labelName="Title"
                type="text"
                placeholder="Eg. My Facebook Page"
                className="bg-[#2C2A2C]"
                onChange={handleChange}
                required
              />
              <InputField
                name="url"
                labelName="Link"
                type="url"
                placeholder="Eg. https://facebook.com/mypage"
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

export default AddButton;
