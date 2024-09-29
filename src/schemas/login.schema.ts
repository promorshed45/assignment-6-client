
import * as z from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").min(1, "Email is required"),
  password: z.string().trim().min(1, "Password must be at least 6 characters").nonempty("Password is required")
});

export default loginValidationSchema;
