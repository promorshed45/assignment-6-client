"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

import DashboardIcon from "../iconComponents/DashboardIcon";
import LogOutIcon from "../iconComponents/LogOutIcon";
import ProfileIcon from "../iconComponents/ProfileIcon";
import { useUser } from "@/src/providers/user.provider";
import { logout } from "@/src/services/AuthService";
import { protectedRoutes } from "@/src/constant";

const NavDropdownMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading: userLoading } = useUser();

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
        <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
          <DropdownItem
            key="edit"
            startContent={<ProfileIcon className="size-4" />}
            onClick={() => handleNavigation("/profile/my-profile")}
          >
            My Profile
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            startContent={<DashboardIcon className="size-4" />}
            onClick={() => handleNavigation("/profile/create-post")}
          >
            Dashboard
          </DropdownItem>
          <DropdownItem
            key="another-dashboard" // Unique key
            startContent={<DashboardIcon className="size-4" />}
          >
            Another Dashboard
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            startContent={<LogOutIcon className="size-4" />}
            onClick={handleLogout}
          >
            LogOut
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavDropdownMenu;
