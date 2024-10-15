import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";

import { useUserVerifyAccount } from "@/src/hooks/verifyAccount.hook";
import { getCurrentUser } from "@/src/services/AuthService";

const VerifyAccount = () => {
  const { mutate: handleAccountVerify } = useUserVerifyAccount();

  const handleAccountVerification = async () => {
    const userData: any = await getCurrentUser();

    const paymentInfo = {
        userId: userData._id,
        totalPay: 5,
        transactionId: "",
        paymentStatus: "",
        payment_processor: "",
        payment_type: ""
      
    }
    console.log("pamyent page teke", paymentInfo);
    handleAccountVerify(paymentInfo);
  };

  return (
    <Card isFooterBlurred className="w-full h-[200px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-center space-y-4">
        <h1 className="text-xl font-semibold ">Verify Your Account</h1>
        <p className="text-sm text-gray-600">
          Verify your account to unlock exciting new features and access premium content.
        </p>
      </CardHeader>
      <CardFooter className="flex justify-center absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <Button size="sm" onClick={handleAccountVerification}>
          Verify Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccount;
