"use client";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import DashboardIcon from "../iconComponents/DashboardIcon";
import LogOutIcon from "../iconComponents/LogOutIcon";
import ProfileIcon from "../iconComponents/ProfileIcon";
import { useUser } from "@/src/providers/user.provider";
import { logout } from "@/src/services/AuthService";



const NavDropdownMenu = () => {
  const {setIsLoading: userLoading, user } = useUser();

  const handlLogout = () => {
    logout();
    userLoading(true)
  }

  return (
    <div className="flex items-center gap-4">
      
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
       
        <DropdownItem
          key="edit"
          href="/profile"
          startContent={<ProfileIcon className="size-4" />}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key="edit"
          href="/dashboard/user-dashboard"
          startContent={<DashboardIcon className="size-4" />}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handlLogout()}
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
