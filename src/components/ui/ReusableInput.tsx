"user client";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";
import { IInput } from "@/src/types";

interface IProps extends IInput {}

const ReusableInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Input
        {...register(name)}
        errorMessage={errors[name] ? (errors[name].message as string) : ""}
        isInvalid={!!errors[name]}
        label={label}
        required={required}
        size={size}
        type={type}
        variant={variant}
      />
    </div>
  );
};

export default ReusableInput;
