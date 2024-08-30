import { useNavigate } from "react-router-dom";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useAuth from "@/hooks/useAuth";

function Profile() {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const navigateToSettings = () => navigate("/settings");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-6 lg:mb-10 lg:mr-0">
        <Avatar>
          <AvatarFallback className="bg-background">
            {authState.user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 mb-1 bg-[#332e31] text-white">
        <DropdownMenuLabel>{authState.user?.username}</DropdownMenuLabel>
        <DropdownMenuItem onClick={navigateToSettings} className="cursor-pointer">
          <div className="flex flex-row items-center">
            <GearIcon />
            <span className="ml-2">Settings</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <div className="flex flex-row items-center">
            <ExitIcon />
            <span className="ml-2">Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Profile;
