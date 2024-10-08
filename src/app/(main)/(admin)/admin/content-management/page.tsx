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

import { TPost, TResponse, TUser } from "@/src/types";
import {
  useAlluserQuery,
  useDeleteUserMutation,
} from "@/src/redux/features/user/userApi";
import EditUser from "@/src/components/ui/allUser/EditUser";
import {
  useDeleteSpecificPostMutation,
  useGetPostQuery,
} from "@/src/redux/features/post/postApi";
import AdminUpdatePost from "@/src/components/ui/post/AdminUpdatePost";

export default function ContentManagement() {
  const { data: allPost } = useGetPostQuery(undefined);
  const [deletePost] = useDeleteSpecificPostMutation();

  const handleDeletePost = async (id: string) => {
    try {
      // before delete alert
      Swal.fire({
        title: "Are you sure?",
        text: "You went to delete this Post",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("deleting....");

          // delete mutation
          const res = (await deletePost(id)) as TResponse<any>;
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
        <TableColumn>User</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Like</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {allPost?.data?.map((post: TPost) => {
          return (
            <TableRow key={post?._id}>
              <TableCell>
                <Image className="size-10" src={post?.image} />
              </TableCell>
              <TableCell>{post?.user?.name}</TableCell>
              <TableCell>{post?.category}</TableCell>
              <TableCell>{post?.type}</TableCell>
              <TableCell>
                <span
                  className={`${post?.status == "Active" ? "text-green-500" : "text-red-500"}`}
                >
                  {post?.status}
                </span>
              </TableCell>
              <TableCell>{post?.like?.length}</TableCell>
             
              <TableCell className="flex gap-2">
                {/* edit user */}
                <AdminUpdatePost data={post} id={post?._id as string} />
                {/* delete user */}
                <Button
                  className="text-xl text-red-500"
                  size="sm"
                  variant="flat"
                  onClick={() => handleDeletePost(post?._id)}
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
