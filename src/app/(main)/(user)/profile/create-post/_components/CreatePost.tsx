"use client"
import {
  Modal,
  ModalContent,
  ModalHeader,
} from "@nextui-org/modal";
import { Avatar } from "@nextui-org/avatar";
import { useDisclosure } from "@nextui-org/modal";
import {  useState } from "react";
import { Button } from "@nextui-org/button";
import { Verified } from "lucide-react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import QuillEditor from "./QuillEditor";

import { useAddNewPost } from "@/src/hooks/post/post.hook";
import ReusableInput from "@/src/components/ui/ReusableInput";
import ImageUpload from "@/src/components/ui/ImageUpload";
import ReusableSelect from "@/src/components/ui/ReusableSelect";
import { useUser } from "@/src/providers/user.provider";

// interface PostData {
//   images: string[];
//   title: string;
//   status: string;
//   description: string;
// }

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
  const {user: userInfo} = useUser();
  // console.log("userInfo", userInfo);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editorContent, setEditorContent] = useState<string>("");

  const methods = useForm();
  const { mutate: handleAddPost } = useAddNewPost();
  const { handleSubmit } = methods;

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);

    const formData = new FormData();
    const postData = {
      ...data,
      user: userInfo?._id,
      description: editorContent || "",
      images: Array.isArray(data.images) ? data.images : [String(data.images)],
    };

    formData.append("data", JSON.stringify(postData));

    for (const images of imageFiles) {
      formData.append("postImages", images);
    }

    // Debugging logs
    console.log("Form data:", formData.get("data"));
    console.log("Image files:", imageFiles);

    // Call the mutation function
    handleAddPost(formData);
  };

  // const removeImagePreview = (index: number) => {
  //   setImagePreviews((prev) => prev.filter((_, idx) => idx !== index));
  // };
  const formattedCategoriesList = categoriesList.map((category) => ({
    key: category, 
    label: category,
  }));

  
  return (
    <div className="max-w-auto">
      <div className="flex items-center gap-4 pb-8 mx-auto pl-3">
      <div>
      <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="success"
              size="sm"
              src={userInfo?.profilePhoto}
            />
      </div>
      <Button className="w-full bg-gray-100 dark:bg-gray-100/10 dark:text-gray-300" onClick={onOpen} > What's on your mind! {userInfo?.name}? </Button>
      </div>
      <Modal
        isOpen={isOpen}
        placement="center"
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
                  {userInfo?.name}{" "}
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
              {/* <div><h1 className="text-xl font-bold pb-5">Add New Product</h1></div> */}
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <ReusableInput label="Title" name="title" />
                <QuillEditor setDiscription={setEditorContent} />
                {/* <ReusableInput name="category" label="Category"  /> */}
                <ImageUpload
                  label="Upload Product Images"
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
                <div>
                  <Button type="submit">Add Post</Button>
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
