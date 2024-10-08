/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Image,
} from "@nextui-org/react";
import { AiFillDelete } from "react-icons/ai";

import EditUser from "./_components/EditUser";
import { IUser } from "@/src/types";

export default function AllUser() {
  

  const handleDeleteUser = async (id: string) => {
    console.log(id);
  };

  return (
    <Table aria-label="static collection table">
      <TableHeader>
        <TableColumn>IMAGE</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        {/* <TableColumn>Verify</TableColumn> */}
        <TableColumn>STATUS</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {allUser?.data?.map((user: IUser) => {
          return (
            <TableRow key={user?._id}>
              <TableCell>
                <Image className="size-10" src={user?.profilePhoto} />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.role}</TableCell>
              {/* <TableCell>{user?.isVerify}</TableCell> */}
              <TableCell
                className={`${user?.status == "Active" ? "text-green-500" : "text-red-500"}`}
              >
                {user?.status}
              </TableCell>
              <TableCell className="flex gap-2">
                {/* edit user */}
                <EditUser data={user} id={user?._id as string} />
                {/* delete user */}
                <Button
                  className="text-xl text-red-500"
                  size="sm"
                  variant="flat"
                  onClick={() => handleDeleteUser(user?._id)}
                >
                  <AiFillDelete />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
