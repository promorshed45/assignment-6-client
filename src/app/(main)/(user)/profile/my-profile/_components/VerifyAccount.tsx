"use client";
import { Card, CardHeader, CardFooter, ModalContent, ModalBody, ModalFooter, Button, Modal, useDisclosure } from "@nextui-org/react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ShieldEllipsis } from "lucide-react";

import ReusableInput from "@/src/components/ui/ReusableInput";
import { useUserVerifyAccount } from "@/src/hooks/verifyAccount.hook";


const VerifyAccount = ({ user }: { user: any }) => {
  const { mutate: handleVerifyAccount } = useUserVerifyAccount()
  const methods = useForm({
    defaultValues: {
      name: user?.data?.name || "",
      mobileNumber: user?.data?.mobileNumber || "",
      email: user?.data?.email || "",
      amount: user?.data?.amount || 1000,
    },
  });

  const { handleSubmit } = methods;
  const { isOpen, onOpenChange } = useDisclosure();

  const onSubmit = async (data: any) => {

    const userData = {
      user: user?.data?._id,
      amount: data?.amount
    }
    console.log("Form data:", userData);
    // Handle form submission logic here
    handleVerifyAccount(userData);
  };

  return (
    <Card isFooterBlurred className="w-full h-[200px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-center space-y-4">
        <h1 className="text-xl font-semibold">Verify Your Account</h1>
        <p className="text-sm text-gray-600">
          Unlock exciting new features and gain access to premium content by verifying your account today!
        </p>
      </CardHeader>
      <CardFooter className="flex justify-center absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <>
          <Button className="border-green-700/50" variant="bordered" onClick={onOpenChange}>
            <ShieldEllipsis className="text-green-500 size-5" />
            Verify Now
          </Button>
          <Modal className="m-2" isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent className="m-2">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <div className="flex flex-col gap-4 mt-3">
                      <h1 className="text-2xl text-green-600 py-2 text-center">Payment Information</h1>
                      <ReusableInput name="name" size="md" type="text" />
                      <ReusableInput name="mobileNumber" type="text" />
                      <ReusableInput name="email" type="text" />
                      <ReusableInput name="amount" type="number" />
                    </div>
                  </ModalBody>
                  <ModalFooter className="flex items-center justify-center gap-8">
                    <Button className="bg-green-500" type="submit">
                      Pay Now
                    </Button>
                  </ModalFooter>
                </form>
              </FormProvider>
            </ModalContent>
          </Modal>
        </>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccount;
