import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import useAuth from "@/hooks/useAuth";

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
      <div className="flex flex-col items-center mt-6 w-10/12">
        {links.map((link) => (
          <div className="w-full bg-[#f3e9dc] py-3 mb-4 text-black font-medium text-sm text-center rounded-lg">
            <h3>{link.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Phone;
