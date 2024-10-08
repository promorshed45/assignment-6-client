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
import { toast } from "sonner";
import Swal from "sweetalert2";

import { TResponse, TUser } from "@/src/types";
import {
  useAlluserQuery,
  useDeleteUserMutation,
} from "@/src/redux/features/user/userApi";
import EditUser from "@/src/components/ui/allUser/EditUser";

export default function AllUser() {
  const { data: allUser } = useAlluserQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: string) => {
    try {
      // before delete alert
      Swal.fire({
        title: "Are you sure?",
        text: "You went to delete this user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
    const toastId = toast.loading("deleting....");

          // delete mutation
          const res = (await deleteUser(id)) as TResponse<any>;
          if (res?.data) {
            toast.warning("Delete Success", { id: toastId, duration: 1000 });
          } else {
            toast.error(res?.error?.data?.message, { id: toastId });
          }
        }
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
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
        {allUser?.data?.map((user: TUser) => {
          return (
            <TableRow key={user?._id}>
              <TableCell>
                <Image className="size-10" src={user?.image} />
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
