"use client";
import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { motion } from "framer-motion";
import {
  AlignVerticalJustifyEnd,
  GitCommitVerticalIcon,
  ShieldEllipsis,
} from "lucide-react";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import UpdateUserModal from "../../update-profile/page";

export default function Profile({ user }: any) {
  const { name, email, profilePhoto, verified, flower } = user.data;

  // console.log('my-profile--', user.data);
  return (
    <motion.div
      className="bg-white/5 shadow-lg rounded-lg w-full md:w-[500px] xl:w-[600px] mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center relative">
        <UpdateUserModal user={user}/>
        {/* Avatar and Name */}
        <Avatar src={profilePhoto} className="w-28 h-28 text-large" />
        <div>
          <p className="text-lg uppercase font-bold"> {name} </p>
          <p className="text-sm text-gray-500">{email}</p>
          </div>
        <h2 className="text-xl font-semibold mt-2">
          {verified && <GitCommitVerticalIcon className="text-green-500" />}
        </h2>

        {/* Verify Now Button */}
        {!verified && (
          <Button variant="bordered" className="border-green-700/50">
            <ShieldEllipsis className="text-green-500 size-6" />
            Verify Now
          </Button>
        )}

        {/* Followers and Following */}
        <motion.div
          className="flex justify-around w-full mt-4 bg-green-500/10 p-4 rounded-lg shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-600">
              {flower || 0}
            </h3>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-600">
              {flower || 0}
            </h3>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </motion.div>

        {/* Address and Country */}
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="flex items-center gap-2">
            {/* <h2 className="text-sm text-gray-500 px-2 py-1 border border-gray-300 rounded-lg">
              {address || "No address provided"}
            </h2>
            <h2 className="text-sm text-gray-500 px-2 py-1 border border-gray-300 rounded-lg">
              {country || "No country provided"}
            </h2> */}
          </div>
        </div>
        <Divider className="my-6" />

        {/* Add more tabs or actions here */}
        {/* <UserProfileTabs userId={user?._id} /> */}
      </div>
    </motion.div>
  );
}
