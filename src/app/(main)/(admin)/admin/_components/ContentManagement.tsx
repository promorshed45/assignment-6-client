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
import { Delete } from "lucide-react";

import AdminUpdatePost from "./AdminUpdatePost";

import { TPost } from "@/src/types";



export default function ContentManagement({allPost}: any) {

  const handleDeletePost = async (id: string) => {
    console.log(id);
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
        {allPost?.map((post: TPost) => {
          return (
            <TableRow key={post?._id}>
              <TableCell>
                <Image className="size-10" src={post?.images} />
              </TableCell>
              <TableCell>{post?.user?.name}</TableCell>
              <TableCell>{post?.category}</TableCell>
              <TableCell>{post?.type}</TableCell>
              <TableCell>
                <span
                  className={`${post?.status == "PREMIUM" ? "text-green-500" : "text-blue-500"}`}
                >
                  {post?.status}
                </span>
              </TableCell>
              <TableCell> 
                {/* {post?.like?.length}  */}
                  123
              </TableCell>
             
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
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
