import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        ---- Auth Layout ---- <Link href="/"> &#60;go Home&#62;</Link>
      </div>
      <div>{children}</div>
    </>
  );
};

export default layout;
