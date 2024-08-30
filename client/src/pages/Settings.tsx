import SettingsNavbar from "@/components/settings/SettingsNavbar";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import SettingsContent from "@/components/settings/SettingsContent";

import useTitle from "@/hooks/useTitle";

function SettingsPage() {
  useTitle("Settings - LinkIt");

  return (
    <>
      <SettingsNavbar />
      <div className="flex flex-row">
        <SettingsSidebar />
        <SettingsContent />
      </div>
    </>
  );
}

export default SettingsPage;
