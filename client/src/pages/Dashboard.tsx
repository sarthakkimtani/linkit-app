import { useEffect, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import Phone from "@/components/Phone";
import EditLink from "@/components/EditLink";

import axiosInstance from "@/lib/axiosInstance";

function DashboardPage() {
  const [links, setLinks] = useState<Array<Link>>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await axiosInstance.get("/links");
      const result = data["data"].map(({ title, url }: Link) => ({
        title,
        url,
      }));
      setLinks(result);
    };

    fetchLinks();
  }, []);

  const addEmptyLink = () => {
    const newArr = [...links, { title: "Example Link", url: "https://google.com" }];
    setLinks(newArr);
  };

  const deleteLink = (link: Link) => {
    const newArr = links.filter((value) => link !== value);
    setLinks(newArr);
  };

  const updateLink = (oldLink: Link, newLink: Link) => {
    const newArr = links.map((link) => (link === oldLink ? newLink : link));
    setLinks(newArr);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col h-screen pt-8 pl-20">
        <h1 className="text-xl font-bold mb-7">Welcome to LinkIt!</h1>
        <div className="flex flex-row h-full">
          <div className="w-8/12">
            <Button
              variant="default"
              size="lg"
              className="flex items-center bg-[#f3e9dc] hover:bg-[#f3e9dc] w-8/12 rounded-3xl"
              onClick={addEmptyLink}
            >
              <PlusIcon className="mr-1" />
              Add Link
            </Button>
            <div className="flex flex-col mt-12">
              {links.map((link) => (
                <EditLink link={link} onDelete={deleteLink} onUpdate={updateLink} />
              ))}
            </div>
          </div>
          <div className="w-4/12 items-center">
            <Phone links={links} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
