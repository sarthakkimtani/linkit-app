import { useState, useEffect } from "react";
import { AxiosError } from "axios";

import Phone from "@/components/dashboard/Phone";
import EditLink from "@/components/dashboard/EditLink";
import AddButton from "@/components/dashboard/AddButton";

import axiosInstance from "@/lib/axiosInstance";

function MainContent({ onError }: { onError: React.Dispatch<React.SetStateAction<ErrorType>> }) {
  const [links, setLinks] = useState<Array<Link>>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await axiosInstance.get("/links");
      const result = data["data"].map(({ id, title, url }: Link) => ({
        id,
        title,
        url,
      }));
      setLinks(result);
    };

    fetchLinks();
  }, []);

  const addLink = async (link: Link) => {
    try {
      const { data } = await axiosInstance.post("/links", link);
      link.id = data["linkId"];
      const newArr = [...links, link];
      setLinks(newArr);
    } catch (err) {
      if (err instanceof AxiosError) {
        onError({ isError: true, description: err.response!.data.error });
      }
    }
  };

  const deleteLink = async (link: Link) => {
    try {
      await axiosInstance.delete("/links", { data: link });
      const newArr = links.filter((value) => link !== value);
      setLinks(newArr);
    } catch (err) {
      if (err instanceof AxiosError) {
        onError({ isError: true, description: err.response!.data.error });
      }
    }
  };

  const updateLink = async (oldLink: Link, newLink: Link) => {
    try {
      await axiosInstance.put("/links", newLink);
      const newArr = links.map((link) => (link === oldLink ? newLink : link));
      setLinks(newArr);
    } catch (err) {
      if (err instanceof AxiosError) {
        onError({ isError: true, description: err.response!.data.error });
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden h-screen pt-8 pl-20">
      <h1 className="text-xl font-bold mb-7">Welcome to LinkIt!</h1>
      <div className="flex flex-row h-full">
        <div className="w-8/12">
          <AddButton addLink={addLink} />
          <div className="flex flex-col overflow-y-auto max-h-[60%] scrollbar-width-none mt-12">
            {links.map((link) => (
              <EditLink key={link.url} link={link} onDelete={deleteLink} onUpdate={updateLink} />
            ))}
          </div>
        </div>
        <div className="w-4/12 items-center">
          <Phone links={links} />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
