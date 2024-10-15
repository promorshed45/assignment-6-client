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
  rows
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Textarea
        {...register(name)}
        isInvalid={!!errors[name]}
        label={label}
        required={required}
        rows={rows}
        variant={variant}
      />
    </div>
  );
};

export default ReusableTextarea;
