'use client'
import ReusableInput from "@/src/components/ui/ReusableInput";
import { useUpdateMyPost } from "@/src/hooks/updateMyPost.hooks";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { EllipsisVertical, ImageIcon } from 'lucide-react';
import Image from "next/image";
import React, { ChangeEvent, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  title: string;
  description: string;
  imageFiles: File[] | null;
}

interface UpdateMyPostModalProps {
  post: {
    _id: string;
    title: string;
    description: string;
    images: string[];
  };
}

const UpdateMyPostModal = ({ post }: any) => {
  const { mutate: handlePostUpdate } = useUpdateMyPost();
  
  const methods = useForm<FormInputs>({
    defaultValues: {
      title: post.title,
      description: post.description,
      imageFiles: null,
    },
  });

  const { handleSubmit } = methods;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const [images, setImages] = useState<string[]>(post.images || []);

  // Image input change handler
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : null;

    if (files) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];

      const validFiles = files.filter((file) => validTypes.includes(file.type));

      if (validFiles.length === 0) {
        alert("Please upload valid image files (JPEG, PNG, GIF)");
        return;
      }

      setImageFiles(validFiles);
      const fileReaders = validFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
      });

      Promise.all(fileReaders).then((results) => {
        setImages([...images, ...results]);
      });
    }
  };

  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    // Append files to FormData
    if (imageFiles) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    // Append other form data as JSON
    formData.append("data", JSON.stringify({ ...data }));

    // Debugging logs
    console.log("Form data:", data);
    console.log("Image files:", imageFiles);

    // Call mutation function with FormData
    handlePostUpdate({ formData, id: post._id });

  };

  return (
    <>
      <Button
        isIconOnly
        className="bg-default-50 hover:bg-default-100"
        radius="full"
        size="md"
        startContent={<EllipsisVertical size={18} />}
        onPress={onOpen}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="m-2">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <div className="flex flex-col gap-4 mt-3">
                  <div className="">
                    <div className="flex justify-center flex-wrap gap-2 pt-5 mx-auto">
                      {images.map((src, idx) => (
                        <Image
                          key={idx}
                          alt="Post Image Preview"
                          className="object-cover h-32 w-32 flex justify-center rounded"
                          height={250}
                          src={src}
                          width={250}
                        />
                      ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-3">
                      <label className="flex items-center cursor-pointer" htmlFor="post-images">
                        <div className="flex items-center gap-2  rounded px-4 py-2">
                          <ImageIcon className="text-green-500" size={20} />
                          <p>Change Image</p>
                        </div>
                        <input
                          accept="image/*"
                          className="hidden"
                          id="post-images"
                          type="file"
                          multiple
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  <ReusableInput label="Title" name="title" type="text" />
                  <ReusableInput
                    label="Description"
                    name="description"
                    type="textarea"
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center gap-8">
                <Button className="bg-green-500" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateMyPostModal;
