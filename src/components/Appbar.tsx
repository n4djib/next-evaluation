import SigninButton from "@/components/SigninButton";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

const Appbar = () => {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link color="foreground" href="/">
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">NEXT-EVAL</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem> */}
        {/* <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Appbar;
