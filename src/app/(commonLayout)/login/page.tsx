import { title } from "@/src/components/primitives";
import GoogleLogin from "./_components/GoogleLogin";

export default function Login() {
  return (
    <div>
      <h1 className={title()}>Login</h1>
      <GoogleLogin/>
    </div>
  );
}
