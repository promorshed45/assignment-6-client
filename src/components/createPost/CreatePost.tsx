"use client";

import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Avatar } from "@nextui-org/avatar";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Verified } from "lucide-react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { useAddNewPost } from "@/src/hooks/post/post.hook";
import ReusableInput from "@/src/components/ui/ReusableInput";
import ImageUpload from "@/src/components/ui/ImageUpload";
import ReusableSelect from "@/src/components/ui/ReusableSelect";
import { useUser } from "@/src/providers/user.provider";
import QuillEditor from "./QuillEditor";

const categoriesList = [
  "Business Travel",
  "Exploration",
  "Travel Tips",
  "Cultural Experiences",
  "Destination Guides",
  "Food And Drink",
  "Adventure Activities",
];

const PostModal = () => {
  const { user: userInfo } = useUser();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [editorContent, setEditorContent] = useState<string>("");
  const methods = useForm();
  const { mutate: handleAddPost } = useAddNewPost();
  const { handleSubmit, reset } = methods;
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const postData = {
      ...data,
      user: userInfo?._id || null,
      description: editorContent || "",
      images: Array.isArray(data.images) ? data.images : [String(data.images)],
    };

    formData.append("data", JSON.stringify(postData));
    imageFiles.forEach((image) => formData.append("postImages", image));

    handleAddPost(formData); // Handle post submission
    onClose();
    reset();
  };

  const formattedCategoriesList = categoriesList.map((category) => ({
    key: category,
    label: category,
  }));

  return (
    <div className="max-w-auto">
      <div className="flex items-center gap-4 pb-8 mx-auto md:pl-3">
        <Avatar
          isBordered
          as="button"
          className="hidden md:flex"
          color="success"
          size="sm"
          src={userInfo?.profilePhoto}
        />
        <Button
          className="w-full bg-gray-100 dark:bg-gray-100/10 dark:text-gray-300"
          onClick={onOpen}
        >
          What's on your mind! {userInfo?.name}?
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        placement="center"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center gap-2">
              <Avatar
                alt="User Avatar"
                name={userInfo?.name.charAt(0).toUpperCase()}
                size="md"
                src={userInfo?.profilePhoto}
              />
              <div>
                <p className="whitespace-nowrap text-xs flex items-center gap-1 mt-0.5">
                  {userInfo?.name}
                  {userInfo?.verified && (
                    <Verified className="text-primaryColor" />
                  )}
                </p>
                <span className="text-xs text-default-400 whitespace-nowrap">
                  Public
                </span>
              </div>
            </div>
          </ModalHeader>

          <FormProvider {...methods}>
            <div className="flex justify-center flex-col mx-auto shadow-sm py-10">
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <ReusableInput label="Title" name="title" />
                <QuillEditor setDiscription={setEditorContent} />
                <ImageUpload
                  label="Upload Post Images"
                  name="images"
                  setImageFiles={setImageFiles}
                />
                <ReusableSelect
                  label="Status"
                  name="status"
                  options={[
                    { key: "FREE", label: "Free" },
                    { key: "PREMIUM", label: "Premium" },
                  ]}
                  size="sm"
                />
                <ReusableSelect
                  label="Category"
                  name="category"
                  options={formattedCategoriesList}
                  size="sm"
                />

                <div className="flex justify-center">
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit">Add Post</Button>
                  </ModalFooter>
                </div>
              </form>
            </div>
          </FormProvider>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostModal;
