"use client";
import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { timeAgo } from "@/src/utilis/timeFormat";
import { useUser } from "@/src/providers/user.provider";
import UpdateMyPostModal from "./UpdateMyPostModal";

interface PostDetailsProps {
  data: {
    title: string;
    description: string;
    images: string[];
    user: {
      name: string;
      email: string; // Ensure email is included for comparison
      profilePhoto?: string;
    };
    createdAt: string;
  };
}

const PostDetails = ({ data }: PostDetailsProps) => {
  const { user: currentUser } = useUser();
  const [isFollowed, setIsFollowed] = useState(false);

  const { title, description, images, user, createdAt } = data;
  const postDate = timeAgo(createdAt);
  const userPhoto =
    user.profilePhoto || "https://nextui.org/avatars/avatar-1.png";

  console.log("cu", currentUser?.email, "useremail", user.email);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-10"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={userPhoto} />

            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-800">
                {user.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {postDate}
              </h5>
            </div>
          </div>

          {currentUser && user?.email === currentUser?.email ? ( // Corrected the syntax for conditional rendering
            <>
              {/* Your logged-in user UI goes here */}
              <UpdateMyPostModal post={data}/>
            </>
          ) : (
            <Button
              className={
                isFollowed
                  ? "bg-transparent text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => {
                setIsFollowed(!isFollowed);
              }}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </CardHeader>
        <CardBody className="px-4">
          <h2 className="text-2xl font-bold my-4">{title}</h2>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <div className="flex flex-col gap-4">
            {images.map((image, index) => (
              <Image
                key={index}
                alt={`Post image ${index + 1}`}
                className="rounded-lg object-cover"
                height={400}
                src={image}
                width={700}
              />
            ))}
          </div>
        </CardBody>
        {/* icons */}
        <div className="mt-4 flex justify-between px-4 pb-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 fill-[#1E293B] dark:fill-white/90"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeWidth="0" />
              <g id="navigateui" strokeLinecap="round" strokeLinejoin="round" />
              <g id="navigateui">
                <path
                  clipRule="evenodd"
                  d="M5.62436 4.4241C3.96537 5.18243 2.75 6.98614 2.75 9.13701C2.75 11.3344 3.64922 13.0281 4.93829 14.4797C6.00072 15.676 7.28684 16.6675 8.54113 17.6345C8.83904 17.8642 9.13515 18.0925 9.42605 18.3218C9.95208 18.7365 10.4213 19.1004 10.8736 19.3647C11.3261 19.6292 11.6904 19.7499 12 19.7499C12.3096 19.7499 12.6739 19.6292 13.1264 19.3647C13.5787 19.1004 14.0479 18.7365 14.574 18.3218C14.8649 18.0925 15.161 17.8642 15.4589 17.6345C16.7132 16.6675 17.9993 15.676 19.0617 14.4797C20.3508 13.0281 21.25 11.3344 21.25 9.13701C21.25 6.98614 20.0346 5.18243 18.3756 4.4241C16.9023 3.75065 14.9662 3.85585 13.0725 5.51217L14.5302 6.9694C14.8232 7.26224 14.8233 7.73711 14.5304 8.03006C14.2376 8.323 13.7627 8.32309 13.4698 8.03025L11.4698 6.03097L11.4596 6.02065C9.40166 3.88249 7.23607 3.68739 5.62436 4.4241ZM12 4.45873C9.68795 2.39015 7.09896 2.10078 5.00076 3.05987C2.78471 4.07283 1.25 6.42494 1.25 9.13701C1.25 11.8025 2.3605 13.836 3.81672 15.4757C4.98287 16.7888 6.41022 17.8879 7.67083 18.8585C7.95659 19.0785 8.23378 19.292 8.49742 19.4998C9.00965 19.9036 9.55954 20.3342 10.1168 20.6598C10.6739 20.9853 11.3096 21.2499 12 21.2499C12.6904 21.2499 13.3261 20.9853 13.8832 20.6598C14.4405 20.3342 14.9903 19.9036 15.5026 19.4998C15.7662 19.292 16.0434 19.0785 16.3292 18.8585C17.5898 17.8879 19.0171 16.7888 20.1833 15.4757C21.6395 13.836 22.75 11.8025 22.75 9.13701C22.75 6.42494 21.2153 4.07283 18.9992 3.05987C16.901 2.10078 14.3121 2.39015 12 4.45873Z"
                  fillRule="evenodd"
                />
              </g>
            </svg>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
              10k
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="fill-[#1E293B] dark:fill-white/90"
              height="22"
              viewBox="0 0 21 22"
              width="21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.47471 13.9757C5.34981 13.9707 6.19148 13.639 6.83471 13.0457L13.0947 16.6257C13.015 16.902 12.9746 17.1857 12.9754 17.4757C12.9754 19.6657 13.4375 20.0057 15.6754 20.0057C17.9134 20.0057 18.5503 19.6707 18.5503 17.4757C18.5503 15.2807 17.9134 14.6057 15.6754 14.6057C14.769 14.6057 14.0028 14.9067 13.2247 15.4447L6.99471 11.9147C6.916 12.136 6.76971 12.261 6.603 12.3047C6.4407 12.3467 6.26471 12.356 6.07971 12.3257C5.52271 12.2007 5.01671 12.2257 4.47471 12.3257C4.47471 12.4257 4.47471 13.3757 4.47471 13.9757Z" />
              <path d="M11.167 9.02475C10.613 9.02475 10.12 9.48575 10.058 10.0477C9.935 11.7037 9.307 12.4227 8.584 12.4227C8.048 12.4227 7.571 12.0377 7.571 10.6897C7.571 9.05375 8.681 8.01475 10.324 8.01475C10.974 8.01475 11.583 8.30475 12.087 8.75475C12.487 9.12975 12.597 9.49775 12.724 9.76075C12.853 10.0207 12.976 10.2997 13.102 10.4077C13.255 10.5637 13.469 10.6577 13.747 10.6577C14.247 10.6577 14.738 10.0267 14.738 9.25075C14.738 8.83175 14.438 8.39375 14.116 8.05975C13.746 7.69575 13.106 7.44175 12.415 7.44175C11.578 7.44175 10.897 7.66475 10.358 8.01575C10.238 8.05475 10.141 8.03675 10.046 8.01375C9.485 7.89075 9.202 7.31775 9.001 6.61475C8.909 6.34875 8.813 6.09375 8.708 5.84975C8.557 5.49775 8.44 5.08875 8.441 4.70275C8.441 3.92675 9.086 3.51475 9.928 3.51475C10.925 3.51475 11.46 4.47675 11.46 5.58675C11.46 6.42575 11.165 6.92375 10.458 7.26475C10.177 7.40675 9.87071 7.47475 9.577 7.47475H8.97471C8.741 7.47475 8.521 7.48975 8.30471 7.48975H7.261C6.692 7.48975 6.203 7.69775 6.203 8.43975C6.203 9.36475 6.754 9.95475 7.638 9.95475C8.608 9.95475 9.171 9.02475 9.826 9.02475H11.167Z" />
            </svg>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
              15
            </h2>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PostDetails;
