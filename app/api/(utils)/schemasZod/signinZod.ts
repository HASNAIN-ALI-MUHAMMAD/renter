import z from "zod";

export const bodyZodSignIn = z.object({
  email: z.email("Enter a valid email address!"),
  password:z.string(), 
});