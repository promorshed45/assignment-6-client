"use client";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import DashboardIcon from "../iconComponents/DashboardIcon";
import LogOutIcon from "../iconComponents/LogOutIcon";
import ProfileIcon from "../iconComponents/ProfileIcon";
import { useUser } from "@/src/providers/user.provider";
import { logout } from "@/src/services/AuthService";
import { protectedRoutes } from "@/src/constant";
import { usePathname, useRouter } from "next/navigation";



const NavDropdownMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();

  console.log('user dropdown teke', user);
  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div className="flex items-center gap-4">
      
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `user.profilePhoto`,
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          onClick={() => handleNavigation("/profile")}
          key="edit"
          startContent={<ProfileIcon className="size-4" />}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key="edit"
          onClick={() => handleNavigation("/profile/create-post")}
          startContent={<DashboardIcon className="size-4" />}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="edit"
          startContent={<DashboardIcon className="size-4" />}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handleLogout()}
          startContent={<LogOutIcon className="size-4" />}
        >
          LogOut
        </DropdownItem>

      
      </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavDropdownMenu;
