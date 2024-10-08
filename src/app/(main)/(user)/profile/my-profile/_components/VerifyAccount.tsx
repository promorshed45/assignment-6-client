

import { toast } from "sonner";
import {Card, CardHeader, CardFooter, Button} from "@nextui-org/react";

import { useVerifyAccoutMutation } from "@/src/redux/features/userVerify/verifyApi";

const VerifyAccount = () => {
  const [accoutVerify] = useVerifyAccoutMutation();

  const handleAccountVerify = async () => {
    const toastId = toast.loading("Verifying....");
    try {
      const res = await accoutVerify({ paymentAmount: 150 });

      window.location.href = res?.data?.data?.payment_url as string;
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <Card
      isFooterBlurred
      className="w-full h-[200px] col-span-12 sm:col-span-7"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
      <h1 className="text-xl font-semibold">Verify Your Account</h1>
      <p className="text-sm text-gray-600">Verify your account to unlock exciting new features and access premium content.</p>
      </CardHeader>
      <CardFooter className="flex justify-center absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        
        <Button 
         size="sm"
        onClick={() => handleAccountVerify()}
        >
          Verify Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccount;
