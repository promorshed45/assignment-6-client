/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFormContext } from "react-hook-form";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

interface IProps {
  label: string;
  name: string;
  required?: boolean;
  setImageFile?: Dispatch<SetStateAction<File | null>>;
}

const ImageUpload = ({
  label,
  name,
  required = false,
  setImageFile,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate file type (image)
      const validTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF)");

        return;
      }

      if (setImageFile) {
        setImageFile(file);
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label
        className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        accept="image/*" // Accept image files only
        className="hidden"
        id={name}
        type="file"
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        onChange={handleImageChange}
      />

      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}

      {imagePreview && (
        <div className="relative size-48 rounded-xl border-2 border-dashed border-default-3 my-5">
          <Image
            alt="Selected Image"
            className="w-full h-full object-cover object-center rounded-2xl p-1"
            height={200}
            src={imagePreview}
            width={200}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
