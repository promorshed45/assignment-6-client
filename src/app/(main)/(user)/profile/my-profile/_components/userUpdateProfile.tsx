"use client";

import { ImageIcon, Pencil } from "lucide-react";
import { useState, ChangeEvent } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

import ReusableInput from "@/src/components/ui/ReusableInput";
import { useUserUpdateProfile } from "@/src/hooks/updateProfile.hook";

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

export default function UserUpdateProfile({ user }: UpdateUserModalProps) {
  const { mutate: handleUserUpdateProfile } = useUserUpdateProfile();

  const methods = useForm<FormInputs>({
    defaultValues: {
      name: user.data.name,
      imageFile: null,
      country: user.data.country || "",
      address: user.data.address || "",
    },
  });

  const { handleSubmit } = methods;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>(user.data.profilePhoto || "");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    const profilePhoto = imageFile;

    formData.append("data", JSON.stringify({ ...data, profilePhoto }));

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    // Debugging logs
    console.log("Form data:", data);
    console.log("Image file:", profilePhoto);

    // Call your mutation function here
    handleUserUpdateProfile(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF)");

        return;
      }

      setImageFile(file);
      const reader = new FileReader();

      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        className="bg-default-50 hover:bg-default-100"
        radius="full"
        size="sm"
        startContent={<Pencil size={18} />}
        onPress={onOpen}
      />
      <Modal
        className="m-2"
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="m-2">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <div className="flex flex-col gap-4 mt-3">
                  <div className="">
                    <div className="flex items-center justify-center mt-3">
                      {image && (
                        <Image
                          alt="Image Preview"
                          className="w-24 h-24 object-cover rounded-full mt-2"
                          height={96}
                          src={image}
                          width={96}
                        />
                      )}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-3">
                      <label
                        className="flex items-center cursor-pointer"
                        htmlFor="image"
                      >
                        <div className="flex items-center gap-2  rounded px-4 py-2">
                          <ImageIcon className="text-green-500" size={20} />
                          <p>Change Profile Photo</p>
                        </div>
                        <input
                          accept="image/*"
                          className="hidden"
                          id="image"
                          type="file"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  <ReusableInput label="Name" name="name" type="text" />
                  {/* <ReusableInput type="text" name="country" label="Country" />
                  <ReusableInput type="text" name="address" label="Address" /> */}
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center gap-8">
                <Button className="bg-green-500" type="submit">
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
