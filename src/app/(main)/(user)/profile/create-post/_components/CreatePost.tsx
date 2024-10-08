"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Avatar } from "@nextui-org/avatar";
import { useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { FileAxis3dIcon, Images, Verified } from "lucide-react";
import QuillEditor from "./QuillEditor";

// Remove unused interface if not needed
interface PostData {
  images: string[];
  title: string;
  status: string;
  reportCount: number;
  category: string;
}


const categoriesList = [
  "Business Travel",
  "Exploration",
  "Travel Tips",
  "Cultural Experiences",
  "Destination Guides",
  "Food And Drink",
  "Adventure Activities",
];


const PostModal = ({ userInfo }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isError, setIsError] = useState<string>("");
  const [discription, setDiscription] = useState<string>("");


  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }, // Handle errors if needed
  } = useForm<PostData>({
    defaultValues: {
      images: [],
      title: "",
      status: "FREE",
      reportCount: 0,
      category: "Other",
    },
  });

  const images = watch("images");
  const title = watch("title");
  
  // Watch TinyMCE content manually
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    // Check if form is valid (if you plan to use it)
  }, [title, editorContent, images]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews: string[] = [];

    files.forEach((file) => {
      previews.push(URL.createObjectURL(file));
    });

    const limitedPreviews = previews.slice(0, 1);
    setImagePreviews(limitedPreviews);

    try {
      const uploadedImages = await Promise.all(
        files.slice(0, 1).map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "travel-tips");
          formData.append("cloud_name", "Travel-tips&-destination-guides-images");

          const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
          const res = await fetch(`${cloudinaryUrl}`, {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          return data.secure_url;
        }),
      );

      setValue("images", uploadedImages);
    } catch (error) {
      setIsError("Failed to upload image");
    }
  };

  const removeImagePreview = () => {
    setImagePreviews([]);
    setValue("images", []);
  };

  const onSubmit = async (data: PostData) => {
    const postData = { ...data, description: editorContent };
    console.log("postData=>", postData);
    // Handle submission logic
  };

  return (
    <>
      <div className="py-5">
        <Button onClick={onOpen}>Create New Post</Button>
        <Modal
          isOpen={isOpen}
          placement="center"
          size="2xl"
          onOpenChange={onOpenChange}
        >
          <ModalContent className="">
            <div>
              <ModalHeader>
                <div className="flex items-center gap-2">
                  <Avatar
                    alt="User Avatar"
                    className="text-xl"
                    name={userInfo?.name.charAt(0).toUpperCase()}
                    size="md"
                    src={userInfo?.profilePhoto || undefined}
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
              <div className="overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    {isError && (
                      <p className="text-center text-red-500 text-xs">
                        {isError}
                      </p>
                    )}
                    <Controller
                      control={control}
                      name="title"
                      render={({ field }) => (
                        <Input
                          {...field}
                          fullWidth
                          className="mb-4"
                          placeholder="Title"
                          variant="underlined"
                        />
                      )}
                    />
                    <div className="my-4">
                    <QuillEditor setDiscription={setDiscription} />
                    </div>
                    <div className="flex gap-5">
                      <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="w-full mt-4"
                            label="Select post type"
                            variant="underlined"
                          >
                            <SelectItem key="FREE">Free</SelectItem>
                            <SelectItem key="PREMIUM">Premium</SelectItem>
                          </Select>
                        )}
                      />
                      <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                          <Select
                            {...field}
                            multiple
                            className="w-full mt-4"
                            label="Select categories"
                            variant="underlined"
                          >
                            {categoriesList.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    {imagePreviews.length > 0 && (
                      <div className="mt-4 flex flex-wrap w-full gap-4">
                        {imagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative">
                            <Image
                              alt="Preview Image"
                              className="rounded-md"
                              height={200}
                              src={preview}
                              width={200}
                            />
                            <FileAxis3dIcon
                              className="absolute top-1 right-1 p-1 rounded-full bg-default-100 cursor-pointer"
                              onClick={removeImagePreview}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <label htmlFor="file-upload">
                      <input
                        accept="image/*"
                        className="hidden"
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <div className="my-4 w-full cursor-pointer border-2 border-default-200 rounded-md p-2 flex justify-center">
                        Upload Image
                      </div>
                    </label>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit">Submit</Button>
                  </ModalFooter>
                </form>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default PostModal;
