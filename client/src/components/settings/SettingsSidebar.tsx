import { PersonIcon } from "@radix-ui/react-icons";

function SettingsSidebar() {
  return (
    <div className="flex flex-col w-2/12 h-screen pt-12 border-r-[2px] border-bg-accent">
      <div className="flex flex-row items-center pl-12 w-full h-[40px] bg-[#2C2A2C] cursor-pointer">
        <PersonIcon className="mr-1.5" />
        <span>Account</span>
      </div>
    </div>
  );
}

export default SettingsSidebar;
