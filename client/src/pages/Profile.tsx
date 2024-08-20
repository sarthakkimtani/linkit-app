import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LinkTile from "@/components/LinkTile";
import NotFoundPage from "@/pages/NotFound";
import axiosInstance from "@/lib/axiosInstance";

import Logo from "@/assets/logo.svg";
import useTitle from "@/hooks/useTitle";

function ProfilePage() {
  const [links, setLinks] = useState<Array<Link>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { id } = useParams();

  useTitle(notFound ? "404: Not Found" : `@${id}'s LinkIt`);

  useEffect(() => {
    setLoading(true);
    const fetchLinks = async () => {
      try {
        const { data } = await axiosInstance.get(`/profile/${id}`);
        setLinks(data["data"]);
        setLoading(false);
      } catch (err) {
        if (err instanceof AxiosError && err.response && err.response.status === 404) {
          setNotFound(true);
        }
        setLoading(false);
      }
    };
    fetchLinks();
  }, [id]);

  if (notFound) return <NotFoundPage />;
  if (loading) return <></>;

  return (
    <div className="flex flex-col min-h-screen justify-between items-center">
      <div className="flex-grow w-full flex flex-col items-center mt-10">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="bg-primary text-3xl">
            {id?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h4 className="font-bold text-xl mt-4 mb-8">@{id}</h4>
        {links.map((link) => (
          <LinkTile key={link.id} link={link} className="w-5/6 lg:w-1/4" />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <img src={Logo} className="w-32 h-32" alt="logo" />
      </div>
    </div>
  );
}

export default ProfilePage;
