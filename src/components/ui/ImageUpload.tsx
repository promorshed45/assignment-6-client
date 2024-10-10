/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFormContext } from "react-hook-form";
import { ChangeEvent, Dispatch, useState } from "react";
import Image from "next/image";
import { Input } from "@nextui-org/input";

interface IProps {
    label: string;
    name: string;
    required?: boolean;
    setImageFiles?: Dispatch<React.SetStateAction<File[]>>;
}

const ImageUpload = ({ label, name, required = false, setImageFiles }: IProps) => {
    const { register, formState: { errors } } = useFormContext();
    const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setImageFiles!((prev: any)=>[...prev, file])

        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev)=>[...prev, reader.result as string])
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-2">
            <Input
                multiple
                accept="image/*"
                id={name}
                type="file"
                {...register(name, { required: required ? `${label} is required` : false })}
                onChange={handleImageChange}
            />
            {errors[name] && (
                <p className="mt-1 text-sm text-red-500">
                    {errors[name]?.message as string}
                </p>
            )}

            {/* Preview selected images */}
            <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.length > 0 && 
                    imagePreviews.map((image, index) => (
                        <div key={index} className="relative size-32 rounded-xl border-2 border-dashed border-default-3">
                            <Image
                                alt={`Selected ${index + 1}`}
                                className="w-full h-full object-cover object-center rounded-2xl p-1"
                                height={400}
                                src={image}
                                width={200}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ImageUpload;
