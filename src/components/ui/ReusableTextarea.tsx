"use client";
import { Textarea } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { IInput } from "@/src/types";

interface IProps extends IInput {
  rows?: number;
}

const ReusableTextarea = ({
  variant = "bordered",
  label,
  name,
  required = false,
  rows = 4,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Textarea
        {...register(name)}
        label={label}
        required={required}
        rows={rows}
        variant={variant}
        isInvalid={!!errors[name]}
      />
    </div>
  );
};

export default ReusableTextarea;