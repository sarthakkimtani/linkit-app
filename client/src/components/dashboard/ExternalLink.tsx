import { ExternalLinkIcon } from "@radix-ui/react-icons";

function ExternalLink({ username }: { username: string }) {
  const profileLink = import.meta.env.VITE_ORIGIN_DOMAIN + "/u/" + username;

  return (
    <a
      href={`/u/${username}`}
      target="_blank"
      className="flex flex-row items-center text-lg text-center font-semibold mb-5"
    >
      {profileLink}
      <ExternalLinkIcon className="ml-1" />
    </a>
  );
}

export default ExternalLink;
