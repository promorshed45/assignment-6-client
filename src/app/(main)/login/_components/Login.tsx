"use client";
import ReusableForm from "@/src/components/ui/ReusableForm";
import ReusableInput from "@/src/components/ui/ReusableInput";
import loginValidationSchema from "@/src/schemas/login.schema";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Divider } from "@nextui-org/divider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUser } from "@/src/providers/user.provider";
import Loading from "@/src/components/ui/Loading";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isLoading, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isLoading, isSuccess]);

  return (
    <>
      {isLoading && <Loading />}
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md space-y-5">
            <h2 className="text-center text-3xl font-bold leading-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-rose-500 transition-all duration-200 hover:underline"
              >
                Create a new account
              </Link>
            </p>

            {/* ReusableForm with ReusableInput */}
            <div className="py-3">
              <ReusableForm
                defaultValues={{
                  email: "johndoe@example.com",
                  password: "user123"
                }}
                onSubmit={onSubmit}
                resolver={zodResolver(loginValidationSchema)}
              >
                <ReusableInput label="Email" name="email" type="email" />
                <ReusableInput name="password" type="password" label="Password" />
                <Button type="submit" className="w-full mt-4">
                  Submit
                </Button>
              </ReusableForm>
            </div>

            <Divider className="my-4" />

            <div className="mt-3 space-y-3">
              <button
                onClick={() => {
                  signIn("google", { callbackUrl: "/dashboard" });
                }}
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
