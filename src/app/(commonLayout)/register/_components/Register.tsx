"use client";
import ReusableForm from "@/src/components/ui/ReusableForm";
import ReusableInput from "@/src/components/ui/ReusableInput";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserLogin } from "@/src/hooks/auth.hook";
import ReusableTextarea from "@/src/components/ui/ReusableTextarea";
import RegistrationValidationSchema from "@/src/schemas/register.schema";

const Register = () => {
  const { mutate: handleUserLogin } = useUserLogin();

  const onSubmit = async (userData: any) => {
    handleUserLogin(userData);

    console.log("login page teke", userData);
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md space-y-5">
          <h2 className="text-center text-3xl font-bold leading-tight">
            Create an new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-rose-500 transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>

          {/* ReusableForm with ReusableInput */}
          <div className="py-3">
            <ReusableForm
              // defaultValues={{
              //   email: "admin@gmail.com",
              //   password: "admin123",
              // }}
              onSubmit={onSubmit}
              resolver={zodResolver(RegistrationValidationSchema)}
            >
              <ReusableInput label="Full Name" name="name" type="name" />
              <ReusableInput label="Mobile Number" name="mobileNumber" type="mobileNumber" />
              <ReusableInput label="Email" name="email" type="email" />
              <ReusableTextarea  label="Message" name="message"/>
              <ReusableInput name="password" type="password" label="Password" />

              <Button type="submit" className="w-full mt-4">
                Submit
              </Button>
            </ReusableForm>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
