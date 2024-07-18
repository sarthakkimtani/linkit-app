import Profile from "@/components/dashboard/Profile";

import AltLogo from "@/assets/logo-alt.svg";

function Sidebar() {
  return (
    <div className="fixed left-0 top-0 w-14 h-full bg-primary">
      <div className="flex flex-col justify-between items-center h-full">
        <img className="pt-5" src={AltLogo} />
        <Profile />
      </div>
    </div>
  );
}

export default Sidebar;
