"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import React from "react";

// Adjusted CommentBox with improved design
const CommentBox = ({ comment }: any) => {
  // console.log(comment);

  return (
    <div className="px-4 py-5 mt-5">
      {comment?.data?.length === 0 ? (
        <div className="px-4 py-5 mt-5 bg-blue-500/10 shadow-lg rounded-lg"> <p className="text-gray-500 text-center">No comments available.</p> </div>
      ) : (
        comment?.data?.map((item: any) => (
          <div key={item._id} className="pb-4 px-4 py-5 mb-5 flex items-start justify-between w-full bg-blue-500/10 transition-all duration-200 rounded-md">
            <div className="flex gap-3 w-[95%] items-start">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={item?.authorId?.profilePhoto}
              />
              <div className="flex flex-col gap-1 items-start justify-center pr-4 bg-gray-50 rounded-xl p-3 shadow-sm">
                <h4 className="text-base font-semibold leading-tight text-gray-800">
                  {item?.authorId?.name}
                </h4>
                <h5 className="text-sm text-gray-600">{item?.content}</h5>
              </div>
            </div>

            {/* Dropdown */}
            <div className="w-[5%]">
              <Dropdown>
                <DropdownTrigger>
                  <button className="p-2 rounded-full hover:bg-gray-200 transition duration-200">
                    <EllipsisVertical />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">New file</DropdownItem>
                  <DropdownItem key="copy">Copy link</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentBox;
