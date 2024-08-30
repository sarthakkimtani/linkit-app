function LinkTile({ link, className }: { link: Link; className?: string }) {
  return (
    <a
      key={link.url}
      href={link.url}
      target="_blank"
      className={`bg-accent py-4 mb-5 text-black font-medium text-md text-center rounded-lg ${className}`}
    >
      {link.title}
    </a>
  );
}

export default LinkTile;
