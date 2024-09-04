import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full h-10 px-8 flex justify-between items-center bg-yellow-50/70 text-accent-foreground">
      <p>All rights reserved ©2024</p>
      <Link
        href="https://github.com/sezeef/crop-recommendation"
        target="_blank"
        className="underline"
      >
        Github
      </Link>
    </footer>
  );
}
