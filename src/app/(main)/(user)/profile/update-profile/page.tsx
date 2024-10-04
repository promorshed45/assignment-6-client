"use client";
import ReusableForm from "@/src/components/ui/ReusableForm";
import ReusableInput from "@/src/components/ui/ReusableInput";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableTextarea from "@/src/components/ui/ReusableTextarea";
import RegistrationValidationSchema from "@/src/schemas/register.schema";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useUserUpdateProfile } from "@/src/hooks/updateProfile.hooks";
import ImageUpload from "@/src/components/ui/ImageUpload";
import { useState } from "react";
import { useUser } from "@/src/providers/user.provider";

const EditProfile = () => {
  const { user, setIsLoading: userLoading } = useUser();

  console.log('user', user);

  const methods = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      mobileNumber: user?.mobileNumber || "",
      password: "",
    },
  });

  const { mutate: handleUpdateProfile } = useUserUpdateProfile();
  const { handleSubmit } = methods;

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);

    const formData = new FormData();

    const productData = {
      ...data,
      price: Number(data.price),
      inventory: { quantity: Number(data?.quantity) },
      tags: data.tags ? data.tags.split(",").map((tag: any) => tag.trim()) : [],
      images: Array.isArray(data.images) ? data.images : String(data.images),
    };

    formData.append("data", JSON.stringify(productData));

    for (const images of imageFiles) {
      formData.append("productImages", images);
    }

    // Debugging logs
    console.log("Form data:", formData.get("data"));
    console.log("Image files:", imageFiles);

    // Call the mutation function
    handleUpdateProfile(formData);
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md space-y-5">
          <h2 className="text-center text-3xl font-bold leading-tight">
            Update your profile...
          </h2>

          {/* ReusableForm with ReusableInput */}
          <div className="py-3">
          <FormProvider {...methods}>
            <form
              
              onSubmit={handleSubmit(onSubmit)}
              // resolver={zodResolver(RegistrationValidationSchema)}
            >
              <ReusableInput label="Name" name="name" type="name" />
              <ReusableInput label="Email" name="email" type="email" />
              <ReusableInput label="Mobile Number" name="mobileNumber" type="mobileNumber" />
              <ReusableInput name="password" type="password" label="Password" />

              <ImageUpload
                label="Upload Product Images"
                name="images"
                setImageFiles={setImageFiles}
              />
              <Button type="submit" className="w-full mt-4">
                Submit
              </Button>
            </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
