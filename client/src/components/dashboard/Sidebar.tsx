import Profile from "@/components/dashboard/Profile";

import AltLogo from "@/assets/logo-alt.svg";

function Sidebar() {
  return (
    <div className="fixed top-0 w-full h-14 lg:left-0 lg:top-0 lg:w-14 lg:h-full bg-primary">
      <div className="flex flex-row lg:flex-col justify-between items-center h-full">
        <img className="h-full lg:h-fit pl-2 lg:pt-5 lg:pl-0" src={AltLogo} />
        <Profile />
      </div>
    </div>
  );
}

export default Sidebar;
