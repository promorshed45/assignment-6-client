"use client"
import { IComment } from "@/src/types";
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const CommentBox = ({ comment }: { comment: [IComment] | [] }) => {
  //   console.log(comment);
  return (
    <div className="px-3">
      <Divider className="mb-3" />
      {comment?.map((item: any) => {
        return (
          <div className=" pb-4 px-2 flex items-center  justify-start w-[100%]" key={item?._id}>
            <div className="flex gap-2 w-[95%] items-start justify-start">
              <Avatar
                className=""
                isBordered
                radius="full"
                size="md"
                src={item?.userId?.image}
              />
              <div className="flex flex-col gap-1 items-start justify-center pr-10 w-[90%] bg-default-200 rounded-xl p-2">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {item?.userId?.name}
                </h4>
                <h5 className="text-small ">{item?.comment}</h5>
              </div>
            </div>

              {/* dropdown */}
              <div className="w-[5%] ">
              <Dropdown>
                <DropdownTrigger>
                  <button className="p-2 rounded-full hover:bg-slate-200">
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
        );
      })}
    </div>
  );
};

export default CommentBox;
