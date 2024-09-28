'use client'
import { Button } from "@nextui-org/button";
import { signIn } from 'next-auth/react';
const GoogleLogin = () => {
    return (
        <div>
            <Button className="rounded-md" onClick={() => {
                signIn("google", { callbackUrl: "/dashboard" })
            }}> Login with Google</Button>
        </div>
    );
};

export default GoogleLogin;