import { z } from "zod";

const userRegistrationValidationSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required"),
  
  email: z.string()
    .trim()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  
  password: z.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
  
  phone: z.string()
    .trim()
    .min(1, "Phone number is required"),
  
  
  address: z.string()
    .trim()
    .min(1, "Address is required"),

});

export default userRegistrationValidationSchema;
