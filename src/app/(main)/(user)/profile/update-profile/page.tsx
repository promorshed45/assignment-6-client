'use client';

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Images, Pencil } from "lucide-react";
import ReusableInput from "@/src/components/ui/ReusableInput";

interface CloudinaryResponse {
  secure_url: string;
}

interface FormInputs {
  name: string;
  imageFile: File | null;
  country: string;
  address: string;
}

interface UpdateUserModalProps {
  user: {
    data: {
      _id: string;
      name: string;
      profilePhoto: string;
      country?: string;
      address?: string;
    };
  };
}

export default function UpdateUserModal({ user }: UpdateUserModalProps) {
  const { name, profilePhoto } = user.data;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<string>(profilePhoto || "");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const methods = useForm<FormInputs>({
    defaultValues: {
      name: user.data.name,
      imageFile: null,
      country: user.data.country || "",
      address: user.data.address || "",
    },
  });

  const { setValue, watch, reset, handleSubmit, formState: { isSubmitting } } = methods;

  // Watch for image file changes to display preview
  const imageFile = watch("imageFile");

  // Set default values when modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        name: user.data.name,
        imageFile: null,
        country: user.data.country || "",
        address: user.data.address || "",
      });
      setImage(profilePhoto || "");
    }
  }, [isOpen, user, reset]);

  // Handle image selection and preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imageFile", file);
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    let uploadedImageUrl = image;

    if (formData.imageFile) {
      setIsUploading(true);
      try {
        // Upload image to Cloudinary or any service
        const formDataObj = new FormData();
        formDataObj.append("file", formData.imageFile);
        formDataObj.append("upload_preset", "your_upload_preset");

        const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
          method: "POST",
          body: formDataObj,
        });

        const data: CloudinaryResponse = await response.json();
        uploadedImageUrl = data.secure_url;
      } catch (error) {
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    }

    // Submit form with updated data
    const updatedUser = {
      ...formData,
      profilePhoto: uploadedImageUrl,
    };
    console.log("Updated user data:", updatedUser);

    // Handle successful submission (close modal, etc.)
    toast.success("Profile updated successfully!");
    onOpenChange(false);
  };

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        radius="full"
        className="bg-default-50 hover:bg-default-100"
        startContent={<Pencil size={18} />}
        onPress={onOpen}
      />
      <Modal
        placement="center"
        className="m-2"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="m-2">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <div className="flex flex-col gap-4 mt-3">
                  <div className="flex items-center justify-center mt-3">
                    {image && (
                      <Image
                        src={image}
                        alt="Image Preview"
                        className="w-24 h-24 object-cover rounded-full mt-2"
                        width={96}
                        height={96}
                      />
                    )}
                  </div>
                  <ReusableInput type="text" name="name" label="Name" />
                  <ReusableInput type="text" name="country" label="Country" />
                  <ReusableInput type="text" name="address" label="Address" />
                  <div className="mt-3">
                    <label htmlFor="image">
                      <Images className="text-pink-500 cursor-pointer" />
                    </label>
                    <input
                      className="hidden"
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center gap-8">
                <Button
                  className="bg-green-500"
                  type="submit"
                  isDisabled={isSubmitting || isUploading}
                >
                  {isUploading ? "Uploading..." : "Save"}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
}
