import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import useAuth from "@/hooks/useAuth";
import LinkTile from "@/components/LinkTile";

function Phone({ links }: { links: Link[] }) {
  const { authState } = useAuth();

  return (
    <div className="flex flex-col items-center pt-10 w-8/12 h-[90%] border-2 border-gray-400 bg-[#3b3337] rounded-3xl">
      <Avatar className="w-14 h-14">
        <AvatarFallback className="bg-background text-lg">
          {authState.user?.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h4 className="font-bold mt-2">@{authState.user?.username}</h4>
      <div className="flex flex-col w-10/12 items-center mt-6 overflow-y-auto scrollbar-width-none max-h-[80%]">
        {links.map((link) => (
          <LinkTile key={link.id} link={link} className="w-full" />
        ))}
      </div>
    </div>
  );
}

export default Phone;
