import SigninButton from "@/components/SigninButton";
import Link from "next/link";

const Appbar = () => {
  return (
    <nav className="border-b-2 p-1 flex justify-between items-center">
      <div>
        <Link color="foreground" href="/">
          <p className="font-bold text-inherit p-é text-xl ml-1">NEXT-EVAL</p>
        </Link>
      </div>
      <div className="flex gap-3">
        <Link color="foreground" href="/profile">
          Profile
        </Link>
        <Link color="foreground" href="/about">
          About
        </Link>
      </div>
      <div>
        <SigninButton />
      </div>
    </nav>
  );
};

export default Appbar;
