import { useState, useEffect } from "react";
import { AxiosError } from "axios";

import Phone from "@/components/dashboard/Phone";
import AddButton from "@/components/dashboard/AddButton";
import ExternalLink from "@/components/dashboard/ExternalLink";
import LinksList from "@/components/dashboard/LinksList";

import axiosInstance from "@/lib/axiosInstance";
import useAuth from "@/hooks/useAuth";

function MainContent({ onError }: { onError: React.Dispatch<React.SetStateAction<ErrorType>> }) {
  const { authState } = useAuth();
  const [links, setLinks] = useState<Array<Link>>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await axiosInstance.get("/links");
      const result = data["data"].map(({ id, title, url, order }: Link) => ({
        id,
        title,
        url,
        order,
      }));
      setLinks(result);
    };

    fetchLinks();
  }, []);

  const addLink = async (link: Link) => {
    try {
      link.order = links.length + 1;
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
      const id = link.id;
      await axiosInstance.delete(`/links/${id}`);
      const filteredArr = links.filter((value) => link !== value);
      const newArr = filteredArr.map((link, index) => ({ ...link, order: index + 1 }));
      setLinks(newArr);
    } catch (err) {
      if (err instanceof AxiosError) {
        onError({ isError: true, description: err.response!.data.error });
      }
    }
  };

  const updateLink = async (oldLink: Link, newLink: Link) => {
    try {
      const id = oldLink.id;
      await axiosInstance.put(`/links/${id}`, newLink);
      const newArr = links.map((link) => (link === oldLink ? newLink : link));
      setLinks(newArr);
    } catch (err) {
      if (err instanceof AxiosError) {
        onError({ isError: true, description: err.response!.data.error });
      }
    }
  };

  const updateLinkOrder = async (links: Link[]) => {
    try {
      const payload = links.map((link) => {
        return { id: link.id, order: link.order };
      });
      await axiosInstance.put("/links/reorder", payload);
    } catch (err) {
      if (err instanceof AxiosError) {
        onError({ isError: true, description: err.response!.data.error });
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden lg:h-screen px-6 pt-20 lg:pt-8 lg:pl-20">
      <div className="flex flex-row items-center">
        <div className="w-full flex flex-col items-stretch lg:w-7/12 xl:w-8/12">
          <h1 className="text-xl font-bold mb-7">Welcome to LinkIt!</h1>
        </div>
        <div className="hidden lg:block lg:w-5/12 xl:w-4/12 items-center">
          <ExternalLink username={authState.user!.username} />
        </div>
      </div>
      <div className="flex flex-row lg:h-full">
        <div className="w-full flex flex-col items-stretch lg:w-7/12 xl:w-8/12">
          <AddButton addLink={addLink} />
          <LinksList
            links={links}
            setLinks={setLinks}
            updateLinkHandler={updateLink}
            deleteLinkHandler={deleteLink}
            updateLinkOrderHandler={updateLinkOrder}
          />
        </div>
        <div className="hidden lg:block lg:w-5/12 xl:w-4/12 items-center">
          <Phone links={links} />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
