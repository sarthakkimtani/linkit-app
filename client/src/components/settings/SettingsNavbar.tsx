import Icon from "@/assets/icon.svg";

function SettingsNavbar() {
  return (
    <div className="flex flex-col justify-center w-full h-[70px] border-b-[2px] border-bg-accent">
      <div className="flex flex-row items-center pl-10">
        <img src={Icon} className="w-7 h-7 mr-1" alt="icon" />
        <span className="text-2xl font-light mr-2 text-gray-500">/</span>
        <h1 className="text-2xl font-bold py-10">Settings</h1>
      </div>
    </div>
  );
}

export default SettingsNavbar;
