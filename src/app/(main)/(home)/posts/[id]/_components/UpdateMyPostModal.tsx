'use client';
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import {  ImageIcon } from 'lucide-react';
import Image from "next/image";
import React, { ChangeEvent, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

import ReusableInput from "@/src/components/ui/ReusableInput";
import { useUpdatePost } from "@/src/hooks/post/post.hook";

interface FormInputs {
  title: string;
  description: string;
  imageFiles: File[] | null;
}

const UpdateMyPostModal = ({ id, post, isOpen, onClose }: { id: string; post: any; isOpen: boolean; onClose: () => void; }) => {
  const { mutate: handlePostUpdate } = useUpdatePost();

  const methods = useForm<FormInputs>({
    defaultValues: {
      title: post?.title || '',
      description: post?.description || '',
      imageFiles: null,
    },
  });

  const { handleSubmit } = methods;
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const [images, setImages] = useState<string[]>(post?.images || []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : null;

    if (files) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const validFiles = files.filter((file) => validTypes.includes(file.type));

      if (validFiles.length === 0) {
        alert("Please upload valid image files (JPEG, PNG, GIF)");
        return;
      }

      if (validFiles.length + images.length > 5) {
        alert("You can only upload up to 5 images.");
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
        setImages((prev) => [...prev, ...results]);
      });
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (imageFiles) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    formData.append("data", JSON.stringify({ ...data }));

    await handlePostUpdate({ postId: id, postData: formData });
    onClose();
  };
  

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent className="m-2">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <div className="flex flex-col gap-4 mt-3">
                <div className="flex justify-center flex-wrap gap-2 pt-5 mx-auto">
                  {images.map((src, idx) => (
                    <Image
                      key={idx}
                      alt="Post Image Preview"
                      className="object-cover h-32 w-32 rounded"
                      height={250}
                      src={src}
                      width={250}
                    />
                  ))}
                </div>
                <div className="flex justify-center items-center gap-2 mt-3">
                  <label className="flex items-center cursor-pointer" htmlFor="post-images">
                    <div className="flex items-center gap-2 rounded px-4 py-2">
                      <ImageIcon className="text-green-500" size={20} />
                      <p>Change Image</p>
                    </div>
                    <input
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="post-images"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <ReusableInput label="Title" name="title" type="text" />
                <ReusableInput label="Description" name="description" type="textarea" />
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
  );
};

export default UpdateMyPostModal;
