import Logo from "@/assets/logo.svg";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={Logo} className="w-44 mb-10" alt="logo" />
      <h3 className="text-xl font-bold">Requested URL could not be found.</h3>
    </div>
  );
}

export default NotFoundPage;
