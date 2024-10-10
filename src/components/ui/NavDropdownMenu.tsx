"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  NavbarContent,
  Avatar,
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
  const { user, setIsLoading: userLoading } = useUser();

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
     
     <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={user?.profilePhoto}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            
            <DropdownItem>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: user?.profilePhoto || "https://nextui.org/avatars/avatar-1.png",
              }}
              className="transition-transform"
              description={user?.email}
              name={user?.name}
            />
          </DropdownItem>


            {user && user.role === "ADMIN" ? (
            <DropdownItem
              key="dashboard"
              startContent={<DashboardIcon className="size-4" />}
              onClick={() => handleNavigation("/admin")}
            >
              Dashboard
            </DropdownItem>
          ) : (
            <DropdownItem
              key="edit"
              startContent={<ProfileIcon className="size-4" />}
              onClick={() => handleNavigation("/profile/my-profile")}
            >
              My Profile
            </DropdownItem>
          )}
             <DropdownItem
            key="logout"
            className="text-danger font-medium"
            color="danger"
            startContent={<LogOutIcon className="size-4" />}
            onClick={handleLogout}
          >
            LogOut
          </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </div>
  );
};

export default NavDropdownMenu;
